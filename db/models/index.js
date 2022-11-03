import User from "./User.model"
import Board from "./Board.model"
import Cheese from "./Cheese.model"

User.hasMany(Board)
Board.belongsTo(User)

Board.belongsToMany(Cheese, { through: "Board_Cheese" })
Cheese.belongsToMany(Board, { through: "Board_Cheese" })

export default { User, Board, Cheese }