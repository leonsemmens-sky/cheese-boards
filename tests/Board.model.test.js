import { Board } from "../db/models";
import seed from "../src/seed";

describe("Test the Board model", () => {
	describe("Test record creation", () => {
		beforeEach(async () => {
			await Board.sync({ force: true });
		});

		it("each record should have a boardId, type, description and rating", async () => {
			let board = await Board.create({
				type: "French cheese",
				description: "A selection of the finest french cheeses",
				rating: 8,
			});
			expect(Object.keys(board.toJSON())).toEqual(
				expect.arrayContaining([
					"boardId",
					"type",
					"description",
					"rating",
				])
			);
		});

		it("each record should have the correct data", async () => {
			let board = await Board.create({
				type: "French cheese",
				description: "A selection of the finest french cheeses",
				rating: 8,
			});
			expect(board.toJSON()).toEqual(
				expect.objectContaining({
					boardId: 1,
					type: "French cheese",
					description: "A selection of the finest french cheeses",
					rating: 8,
				})
			);
		});
	});

	describe("Test with multiple records", () => {
		beforeEach(async () => {
			await seed();
		});

		it("should insert 4 records into the database", async () => {
			expect(await Board.count()).toBe(4);
		});

		it("should automatically increment the boardId", async () => {
			let boards = (await Board.findAll()).map((board) => board.toJSON());
			expect(boards[3].boardId).toBe(4);
		});

		it("data should change when being updated", async () => {
			const newDescription = "A board of cheese!";
			await Board.update(
				{
					description: newDescription,
				},
				{
					where: {
						type: "Smoked",
					},
				}
			);

			expect(
				(
					await Board.findOne({
						where: {
							type: "Smoked",
						},
					})
				).toJSON().description
			).toBe(newDescription);
		});

		it("record should be removed when deleted", async () => {
			await Board.destroy({
				where: {
					type: "French cheese",
				},
			});

			expect(await Board.count()).toBe(3);
		});
	});
});
