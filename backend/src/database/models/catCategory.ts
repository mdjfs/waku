import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Cat from "./cat";
import Category from "./category";

@Table({ timestamps: true, tableName: "cat_category", freezeTableName: true })
export default class CatCategory extends Model {
  @ForeignKey(() => Category)
  @Column
  categoryId: string;

  @ForeignKey(() => Cat)
  @Column
  catId: number;
}
