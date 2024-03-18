// @ts-nocheck
import { createBrowser } from "./createBrowser";

export const scrapePerp = async () => {
  const browser = await createBrowser();

  if (browser) {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Safari/537.36"
    );

    await page.goto("https://www.coincarp.com/currencies/perp/richlist/", {
      waitUntil: "networkidle0",
    });

    const extractedData = await page.evaluate(() => {
      const headers = Array.from(
        document.querySelectorAll(".dataTables_scrollHead th")
      ).map((header) => header?.textContent?.trim());

      const rows = Array.from(
        document.querySelectorAll(".dataTables_scrollBody tbody tr")
      )
        .slice(0, 10)
        .map((row) => {
          return Array.from(row.querySelectorAll("td")).reduce(
            (obj, cell, index) => {
              if (headers[index] === "Address") {
                const addressMatch =
                  cell.textContent.match(/0x[a-fA-F0-9]{40}/);
                obj[headers[index]?.toLocaleLowerCase()] = addressMatch
                  ? addressMatch[0]
                  : null;
              } else {
                obj[headers[index]?.toLocaleLowerCase()] =
                  cell.textContent.trim();
              }
              return obj;
            },
            {}
          );
        });

      return rows;
    });

    await browser.close();

    return extractedData;
  }
  return [];
};
