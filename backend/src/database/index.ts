import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import config from "../config";

const database_config: SequelizeOptions = {};

if (config.database.useSSL) {
  database_config.ssl = true;
  database_config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.database.uri, database_config);
sequelize.addModels([__dirname + "/models"]);
sequelize.sync();
export default sequelize;
