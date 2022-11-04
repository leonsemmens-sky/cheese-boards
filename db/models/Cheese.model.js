import { Model, DataTypes } from "sequelize";
import db from "../.";

export default class Cheese extends Model {}

Cheese.init(
	{
		cheeseId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize: db,
	}
);
