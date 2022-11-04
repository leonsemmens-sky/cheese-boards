import { User } from "../db/models";
import seed from "../src/seed";

// potential testing library: https://github.com/rodeojeffrey/sequelize-test-helpers-jest

describe("Test the User model", () => {
	describe("Test record creation", () => {
		beforeEach(async () => {
			await User.sync({ force: true });
		});

		it("each record should have a userId, name and email", async () => {
			let user = await User.create({
				name: "Steve",
				email: "steve.johnson@multiverse.io",
			});
			expect(Object.keys(user.toJSON())).toEqual(
				expect.arrayContaining(["userId", "name", "email"])
			);
		});

		it("each record should have the correct data", async () => {
			let user = await User.create({
				name: "Steve",
				email: "steve.johnson@multiverse.io",
			});
			expect(user.toJSON()).toEqual(
				expect.objectContaining({
					userId: 1,
					name: "Steve",
					email: "steve.johnson@multiverse.io",
				})
			);
		});

		it("user emails should be unique", async () => {
			await User.create({
				name: "Steve",
				email: "steve.johnson@multiverse.io",
			});

			expect(async () => {
				await User.create({
					name: "Steve",
					email: "steve.johnson@multiverse.io",
				});
			}).rejects.toThrow();
		});
	});

	describe("Test with multiple records", () => {
		beforeEach(async () => {
			await seed();
		});

		it("should insert 3 records into the database", async () => {
			expect(await User.count()).toBe(3);
		});

		it("should automatically increment the userId", async () => {
			let users = (await User.findAll()).map((user) => user.toJSON());
			expect(users[1].userId).toBe(2);
		});

		it("data should change when being updated", async () => {
			const newEmail = "stevejohnson1993@gmail.com";
			await User.update(
				{
					email: newEmail,
				},
				{
					where: {
						name: "Steve",
					},
				}
			);

			expect(
				(
					await User.findOne({
						where: {
							name: "Steve",
						},
					})
				).toJSON().email
			).toBe(newEmail);
		});

		it("record should be removed when deleted", async () => {
			await User.destroy({
				where: {
					name: "Adam",
				},
			});

			expect(await User.count()).toBe(2);
		});
	});
});
