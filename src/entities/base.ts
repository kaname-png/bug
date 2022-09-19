import {
  Entity,
  PrimaryKey,
  SerializedPrimaryKey,
  Property,
  DateTimeType,
  BaseEntity as MikroOrmEntity,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity({ abstract: true })
export class BaseEntity extends MikroOrmEntity<BaseEntity, "id" | "_id"> {
  @PrimaryKey({ type: ObjectId })
  public _id!: ObjectId;

  @SerializedPrimaryKey({ type: "string" })
  public id!: string;

  @Property({ type: DateTimeType })
  public created_at = new Date();

  @Property({ onUpdate: () => new Date(), type: DateTimeType })
  public updated_at = new Date();
}
