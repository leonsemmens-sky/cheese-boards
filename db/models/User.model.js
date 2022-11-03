import { Model, DataTypes } from "sequelize";
import db from "../.";

export default class User extends Model { }

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.TEXT,
        email: DataTypes.TEXT,
    },
    {
        sequelize: db,
    }
);
