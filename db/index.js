import { Sequelize } from "sequelize";
import path from "path";

import * as url from "url";
const _dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default new Sequelize({
	dialect: "sqlite",
	storage: path.join(_dirname, "delicious_cheeses.sqlite"),
	logging: false,
});
