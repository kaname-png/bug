import {
  BooleanType,
  Embeddable,
  Embedded,
  Entity,
  IntegerType,
  OptionalProps,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "./base";

@Entity({ collection: "guild_roles_menu" })
@Unique({ properties: ["message_id"] })
export class GuildRolesMenusEntity extends BaseEntity {
  @Property({ type: "string" })
  public name!: string;

  @Property({ type: "string" })
  public guild_id!: string;

  @Property({ type: "string" })
  public message_id!: string;

  @Property({ type: "string" })
  public channel_id!: string;

  @Property({ type: "string" })
  public created_by!: string;

  @Property({ type: IntegerType })
  public max!: number;

  @Property({ type: BooleanType })
  public status = true;

  @Embedded(() => GuildRolesMenusOptionsEmbed, { array: true })
  public options: GuildRolesMenusOptionsEmbed[] = [];

  public [OptionalProps]?: "created_at" | "updated_at";
}

@Embeddable()
export class GuildRolesMenusOptionsEmbed {
  @Property({ type: "string" })
  public label!: string;

  @Property({ type: "string" })
  public value!: string;

  @Property({ type: "string", nullable: true })
  public emoji: string | null = null;
}
