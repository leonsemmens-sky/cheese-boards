import { Sequelize } from "sequelize";
import path from "path";

export default new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "delicious_cheeses.sqlite"),
    logging: false,
});