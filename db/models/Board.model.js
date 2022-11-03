import { Model, DataTypes } from "sequelize";
import db from "../."

export default class Board extends Model { }

Board.init({
    boardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: DataTypes.TEXT,
    description: DataTypes.TEXT,
    rating: DataTypes.INTEGER
}, {
    sequelize: db
})