import { Model, DataTypes } from "sequelize";
import db from "../.";

export default class User extends Model {}

User.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize: db,
	}
);
