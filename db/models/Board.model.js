import { Model, DataTypes } from "sequelize";
import db from "../.";

export default class Board extends Model {}

Board.init(
	{
		boardId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		rating: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},
	{
		sequelize: db,
	}
);
