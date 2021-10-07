import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Breed from "./breed";
import Cat from "./cat";

@Table({ timestamps: true, tableName: "cat_breed", freezeTableName: true })
export default class CatBreed extends Model {
  @ForeignKey(() => Breed)
  @Column
  breedId: string;

  @ForeignKey(() => Cat)
  @Column
  catId: string;
}
