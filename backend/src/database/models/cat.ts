import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  AllowNull,
  BelongsToMany,
} from "sequelize-typescript";
import Breed from "./breed";
import CatBreed from "./catBreed";
import CatCategory from "./catCategory";
import Category from "./category";
import User from "./user";

@Table({ timestamps: true, tableName: "cat", freezeTableName: true })
export default class Cat extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  url: string;

  @AllowNull
  @Column
  width?: number;

  @AllowNull
  @Column
  height?: number;

  @BelongsToMany(() => Breed, () => CatBreed)
  breeds?: Breed[];

  @BelongsToMany(() => Category, () => CatCategory)
  categories?: Category[];

  @ForeignKey(() => User)
  @AllowNull
  @Column
  requestedById?: number;

  @BelongsTo(() => User)
  requestedBy?: User;
}
