import { Op } from "sequelize";
import { User, Board, Cheese } from "../db/models";
import seed from "../src/seed";

describe("Test one-to-many relationship between User and Board", () => {
	beforeEach(async () => {
		await seed();
	});

	it("a user should be able to have a board", async () => {
		let user = await User.findByPk(1);
		let board = await Board.findOne();

		await user.addBoard(board);

		board = await Board.findOne();

		// Eager loading
		let boards = (
			await User.findOne({
				include: Board,
			})
		).Boards;

		expect(boards.length).toBe(1);
		expect(boards[0]).toEqual(expect.objectContaining(board.toJSON()));
	});

	it("a user should be able to have multiple boards", async () => {
		let user = await User.findByPk(2);
		let boardsToAdd = await Board.findAll();

		await user.addBoards(boardsToAdd);

		// Eager loading
		let boards = (
			await User.findByPk(2, {
				include: Board,
			})
		).Boards;

		expect(boards.length).toBe(boardsToAdd.length);
	});

	it("should remove a board from the user when deleted", async () => {
		let user = await User.findByPk(3);
		let boardsToAdd = await Board.findAll();

		await user.addBoards(boardsToAdd);
		await boardsToAdd[2].destroy();

		// Eager loading
		let boards = (
			await User.findByPk(3, {
				include: Board,
			})
		).Boards;

		expect(boards.length).toBe(boardsToAdd.length - 1);
	});

	it("a board should have a user when a user has a board", async () => {
		let user = await User.findByPk(1);
		let boardsToAdd = await Board.findAll();

		await user.addBoards(boardsToAdd);

		user = await User.findByPk(1);
		let user2 = await (await Board.findOne()).getUser();

		expect(user2).toEqual(user);
	});
});

describe("Test many-to-many relationship between Board and Cheese", () => {
	beforeEach(async () => {
		await seed();
	});

	it("a board should be able to have many cheeses", async () => {
		let board = await Board.findOne({
			where: { type: "Soft and creamy" },
		});
		let cheese = await Cheese.findAll({
			where: {
				description: {
					[Op.like]: "%soft%",
				},
			},
		});

		await board.addCheeses(cheese);

		// Eager loading
		let cheeses = (
			await Board.findOne({
				where: { type: "Soft and creamy" },
				include: Cheese,
			})
		).Cheeses;

		expect(cheeses.length).toBe(cheese.length);
	});

	it("a cheese should be able to have many boards", async () => {
		let cheese = await Cheese.findByPk(6);
		let boardsToAdd = await Board.findAll();

		await cheese.addBoards(boardsToAdd);

		// Eager loading
		let boards = (
			await Cheese.findByPk(6, {
				include: Board,
			})
		).Boards;

		expect(boards.length).toBe(boardsToAdd.length);
	});

	it("a cheese should be removed from a board when it is deleted", async () => {
		let board = await Board.findOne({
			where: { type: "Soft and creamy" },
		});
		let cheese = await Cheese.findAll({
			where: {
				description: {
					[Op.like]: "%soft%",
				},
			},
		});

		await board.addCheeses(cheese);
		await cheese[0].destroy();

		let cheeses = await board.getCheeses();

		expect(cheeses.length).toBe(cheese.length - 1);
	});

	it("a board should be removed from all the cheeses when the board is deleted", async () => {
		let board = await Board.findOne({
			where: { type: "Soft and creamy" },
		});
		let cheeses = await Cheese.findAll({
			where: {
				description: {
					[Op.like]: "%soft%",
				},
			},
		});

		for (let cheese of cheeses) {
			await cheese.addBoard(board);
		}

		await board.destroy();

		for (let cheese of cheeses) {
			expect(await cheese.countBoards()).toBe(0);
		}
	});
});
