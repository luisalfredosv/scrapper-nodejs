import puppeteer from "puppeteer";

export const startBrowser = async () => {
	let browser;
	try {
		console.log("[browser] init : OK");
		browser = await puppeteer.launch({
			headless: false,
			args: ["--disable-setuid-sandbox"],
			ignoreHTTPSErrors: true,
		});
	} catch (err) {
		console.log("[browser] error => : ", err);
	}
	return browser;
};
