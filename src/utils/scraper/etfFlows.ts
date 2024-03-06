// import { PlaywrightCrawler, Dataset } from "crawlee";

// const crawler = new PlaywrightCrawler({
//   async requestHandler({ request, page, log }) {
//     const title = await page.$$eval("td", (tds) => {
//       tds.map((td) => log.info(`${td.textContent}`));
//     });

//     await Dataset.pushData({ title, url: request.loadedUrl });
//   },
// });

// export const scrapeEtfFlows = async () => {
//   try {
//     await crawler.run(["https://www.coinglass.com/bitcoin-etf"]);

//     const data = [];
//   } catch (error) {
//     console.error("Error scraping ETF flows:", error);
//     return null;
//   }
// };
