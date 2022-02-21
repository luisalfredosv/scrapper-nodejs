import utils from "../utils/index.js";

export const extractCruises = async () => {
	const browser = await utils.startBrowser();
	try {
		const page = await browser.newPage();
		await page.goto("https://www.carnival.com/cruise-ships.aspx", {
			timeout: 100000,
		});

		await page.waitForSelector(
			"div.activity-results.list-layout.no-compare-items"
		);

		let cruises = await page.$$eval("div.container > div", (cruise) => {
			let items = cruise.map((el) => {
				const name = el.querySelector("h2.title.ccl-dsk > a") ?? "";
				const img = el.querySelector("span.image > img") ?? "";
				const flag = el.querySelector("span.image > span > img") ?? {};
				const list = el.querySelectorAll("div.text > ul > li") ?? [];

				let items = Array.from(list).map((elem) => {
					const label = elem.querySelector("strong").innerHTML;

					let values = Array.from(list).map((li) => {
						const anchor = li.querySelector("a");
						return {
							anchorText: anchor.innerHTML,
							anchorHref: anchor.href,
						};
					});

					return {
						label,
						values,
					};
				});

				return {
					name: name.innerHTML,
					url: name.href,
					img: {
						src: img.src,
						alt: img.alt,
					},
					flag: {
						src: flag.src,
						alt: flag.alt,
					},
					description: items,
				};
			});
			return items;
		});

		return cruises;
	} catch (error) {
		throw new Error(`Error [extractCruises]: ${error}`);
	} finally {
		browser.close();
		console.log("[browser] finish : OK");
	}
};
