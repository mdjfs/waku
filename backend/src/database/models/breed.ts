import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import Cat from "./cat";
import CatBreed from "./catBreed";

@Table({ timestamps: true, tableName: "breed", freezeTableName: true })
export default class Breed extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  description?: string;

  @AllowNull
  @Column
  country_code?: string;

  @AllowNull
  @Column
  wikipedia_url?: string;

  @AllowNull
  @Column
  origin?: string;

  @BelongsToMany(() => Cat, () => CatBreed)
  cats?: Cat[];
}
