import CHEESES from "./cheeses.json" assert { type: "json" };
import { User, Board, Cheese } from "./models";

async function seed() {
	await User.sync({ force: true });
	await Board.sync({ force: true });
	await Cheese.sync({ force: true });

	let data = [];

	for (let cheese of Object.keys(CHEESES)) {
		data.push({
			title: cheese,
			description: CHEESES[cheese],
		});
	}

	await Cheese.bulkCreate(data);
}

seed();
