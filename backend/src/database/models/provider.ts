import { Table, Column, Model, Unique, HasMany } from "sequelize-typescript";
import User from "./user";

@Table({ timestamps: true, tableName: "provider", freezeTableName: true })
export default class Provider extends Model {
  @Unique
  @Column
  name: string;

  @HasMany(() => User)
  users: User[];
}
