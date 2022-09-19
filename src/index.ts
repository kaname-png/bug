import {
  MikroORM,
  MemoryCacheAdapter,
  UseRequestContext,
} from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import type { MongoDriver } from "@mikro-orm/mongodb";

import { GuildRolesMenusEntity } from "./entities/roles-menu";

const container: Record<string, any> = {};
const setup = async () => {
  const client = await MikroORM.init<MongoDriver>({
    type: "mongo",
    dbName: "naeko_v2",
    ensureIndexes: true,
    debug: true,
    entities: ["./dist/entities/*.js"],
    forceEntityConstructor: true,
    discovery: { alwaysAnalyseProperties: true },
    strict: true,
    validate: true,
    highlighter: new MongoHighlighter(),
    forceUtcTimezone: true,
    cache: {
      enabled: true,
      adapter: MemoryCacheAdapter,
    },
    resultCache: {
      adapter: MemoryCacheAdapter,
      expiration: 5_000,
    },
  });

  container.database = {
    client,
    em: client.em,
    guild: {
      roles_menu: client.em.getRepository(GuildRolesMenusEntity),
    },
  };
};

class TestClass {
  @UseRequestContext(() => container.database.client)
  public async test() {
    const name = `${Date.now()}-test`;

    const menu = container.database.guild.roles_menu.create({
      name,
      guild_id: Date.now().toString(),
      message_id: Date.now().toString(),
      channel_id: Date.now().toString(),
      created_by: Date.now().toString(),
      max: 1,
    });

    await container.database.guild.roles_menu.persistAndFlush(menu);
    const guildRolesMenu = await container.database.guild.roles_menu.find(
      {
        name,
      },
      { limit: 1 }
    );

    return guildRolesMenu;
  }
}

const init = async () => {
  await setup();

  const test = new TestClass();
  console.log(await test.test());
};

init();
