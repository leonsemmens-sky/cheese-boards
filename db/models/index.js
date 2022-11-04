import User from "./User.model";
import Board from "./Board.model";
import Cheese from "./Cheese.model";

// Setup relationships between models
User.hasMany(Board, {
	foreignKey: "userId",
});
Board.belongsTo(User, {
	foreignKey: "userId",
});

Board.belongsToMany(Cheese, {
	through: "Board_Cheese",
	foreignKey: "cheeseId",
});
Cheese.belongsToMany(Board, {
	through: "Board_Cheese",
	foreignKey: "boardId",
});

export { User, Board, Cheese };
