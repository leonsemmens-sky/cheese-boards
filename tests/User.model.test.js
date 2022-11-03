import { User } from "../db/models";

// potential testing library: https://github.com/rodeojeffrey/sequelize-test-helpers-jest

describe("Test the User model", () => {
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

	it("should automatically increment the userId", async () => {
		let users = await User.bulkCreate([
			{
				name: "Steve",
				email: "steve.johnson@multiverse.io",
			},
			{
				name: "Phil",
				email: "phil12345@gmail.com",
			},
			{
				name: "Adam",
				email: "amaxwell@gmail.com",
			},
		]);

		users = users.map((user) => user.toJSON());
		expect(users[2].userId).toBe(3);
	});
});
