import {
  Table,
  Column,
  Model,
  createIndexDecorator,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import Provider from "./provider";

const ProviderConstraint = createIndexDecorator({
  name: "provider-constraint",
  type: "UNIQUE",
  unique: true,
});

@Table({ timestamps: true, tableName: "user", freezeTableName: true })
export default class User extends Model {
  @ProviderConstraint
  @Column
  userId: string;

  @ForeignKey(() => Provider)
  @ProviderConstraint
  @Column
  providerId: number;

  @Column
  name: string;

  @BelongsTo(() => Provider)
  provider: Provider;
}
