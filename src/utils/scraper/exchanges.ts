// @ts-nocheck
import { createBrowser } from "./createBrowser";

export const scrapeExchanges = async () => {
  const browser = await createBrowser();

  if (browser) {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Safari/537.36"
    );

    await page.goto("https://coinmarketcap.com/rankings/exchanges/dex/", {
      waitUntil: "networkidle0",
    });

    const extractedData = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll("thead th")).map(
        (header) => header.textContent.trim()
      );

      const rows = Array.from(document.querySelectorAll("tbody tr"))
        .slice(0, 10)
        .map((row) => {
          const cells = Array.from(row.querySelectorAll("td"));
          const logoUrl = cells[1].querySelector("img.coin-logo").src;
          const volGraph = cells[7].querySelector("img").src;
          const noMarkets = cells[4].textContent.trim();
          return cells.reduce((obj, cell, index) => {
            if (index === 1) {
              obj["name"] = cell.textContent.trim().split("\n")[0].trim();
              obj["logoUrl"] = logoUrl;
              obj["volGraph"] = volGraph;
              obj["noMarkets"] = noMarkets;
            } else {
              obj[headers[index]?.toLowerCase()] = cell.textContent.trim();
            }
            return obj;
          }, {});
        });

      return rows;
    });

    await browser.close();

    return extractedData;
  }
  return [];
};
