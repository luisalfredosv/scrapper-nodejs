import fs from "fs";

export const writeJsonFile = (filePath, data) => {
	try {
		fs.writeFile(filePath, JSON.stringify(data), (err) => {
			if (err) throw err;
			console.log("Data written to file");
		});
		return true;
	} catch (error) {
		console.log(`Error in [writeJsonFile]: ${error}`);
		return false;
	} finally {
		console.log("[writeJsonFile] finish : OK");
	}
};
