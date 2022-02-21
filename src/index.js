import scrappers from "./scrappers/index.js";
import utils from "./utils/index.js";

scrappers
	.extractCruises()
	.then((cruises) => {
		if (cruises.length > 0) {
			utils.writeJsonFile("public/cruises.json", cruises);
		}
	})
	.catch((error) => {
		console.log(error);
	});
