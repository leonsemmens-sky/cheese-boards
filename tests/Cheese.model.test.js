import { Cheese } from "../db/models";
import seed from "../src/seed";

describe("Test the Cheese model", () => {
	describe("Test record creation", () => {
		beforeEach(async () => {
			await Cheese.sync({ force: true });
		});

		it("each record should have a cheeseId, title and description", async () => {
			let cheese = await Cheese.create({
				title: "Brie",
				description: "The Queen of Cheeses.",
			});
			expect(Object.keys(cheese.toJSON())).toEqual(
				expect.arrayContaining(["cheeseId", "title", "description"])
			);
		});

		it("each record should have the correct data", async () => {
			let cheese = await Cheese.create({
				title: "Brie",
				description: "The Queen of Cheeses.",
			});
			expect(cheese.toJSON()).toEqual(
				expect.objectContaining({
					cheeseId: 1,
					title: "Brie",
					description: "The Queen of Cheeses.",
				})
			);
		});
	});

	describe("Test with multiple records", () => {
		beforeEach(async () => {
			await seed();
		});

		it("should insert 21 records into the database", async () => {
			expect(await Cheese.count()).toBe(21);
		});

		it("should automatically increment the cheeseId", async () => {
			let cheeses = (await Cheese.findAll()).map((cheese) =>
				cheese.toJSON()
			);
			expect(cheeses[7].cheeseId).toBe(8);
		});

		it("data should change when being updated", async () => {
			const newDescription = "Mmmmm yum!";
			await Cheese.update(
				{
					description: newDescription,
				},
				{
					where: {
						title: "Brie",
					},
				}
			);

			expect(
				(
					await Cheese.findOne({
						where: {
							title: "Brie",
						},
					})
				).toJSON().description
			).toBe(newDescription);
		});

		it("record should be removed when deleted", async () => {
			await Cheese.destroy({
				where: {
					title: "Gouda",
				},
			});

			expect(await Cheese.count()).toBe(20);
		});
	});
});
