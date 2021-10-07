import { Sequelize } from "sequelize-typescript";
import config from "../config";

const sequelize = new Sequelize(config.database.uri);
sequelize.addModels([__dirname + "/models"]);
sequelize.sync();
export default sequelize;
