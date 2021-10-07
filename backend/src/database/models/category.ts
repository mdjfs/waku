import {
  Table,
  Column,
  Model,
  BelongsToMany,
  AllowNull,
} from "sequelize-typescript";
import Cat from "./cat";
import CatCategory from "./catCategory";

@Table({ timestamps: true, tableName: "category", freezeTableName: true })
export default class Category extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @BelongsToMany(() => Cat, () => CatCategory)
  cats?: Cat[];
}
