import CHEESES from "./cheeses.json";
import Cheese from "./models/Cheese.model";

export default async function seed() {
	let data = [];

	for (let cheese of Object.keys(CHEESES)) {
		data.push({
			title: cheese,
			description: CHEESES[cheese],
		});
	}

	await Cheese.bulkCreate(data);
}
