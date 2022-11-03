import CHEESES from "./cheeses.json";
import Cheese from "./models/Cheese.model";

export default function seed() {
	let data = [];

	for (let cheese of Object.keys(CHEESES)) {
		data.push({
			title: cheese,
			description: CHEESES[cheese],
		});
	}

	return Cheese.bulkCreate(data);
}
