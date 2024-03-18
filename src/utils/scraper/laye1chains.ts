import { createBrowser } from "./createBrowser";

export const scrapeLayer1Chains = async () => {
  try {
    const chainsToRemove = ["Bitcoin", "BSC"];
    const browser = await createBrowser();

    if (browser) {
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Safari/537.36"
      );

      await page.goto("https://defillama.com/chains", {
        waitUntil: "networkidle0",
      });
      await page.waitForSelector(".sc-b89b180a-0.iMrBxF");

      const extractData = async () => {
        return await page.evaluate(() => {
          const rows = Array.from(document.querySelectorAll("div.row"));
          return rows.map((row) => {
            const details = row.querySelectorAll('div[data-chainpage="true"]');
            const imageElement = row.querySelector("img");
            const combinedText = details[0]?.textContent?.trim();
            const rankMatch = combinedText?.match(/^(\d+)/);
            const rank = rankMatch ? rankMatch[0] : null;
            const name = combinedText
              ? combinedText.substring(rank?.length!)
              : null;

            return {
              name,
              imageUrl: imageElement ? imageElement.src : null,
              protocols:
                details[1].textContent &&
                details[1].textContent.trim().length > 0
                  ? details[1]?.textContent.trim()
                  : "-",
              activeAddresses:
                details[2].textContent &&
                details[2]?.textContent.trim().length > 0
                  ? details[2]?.textContent.trim()
                  : "-",
              oneDayChange:
                details[3].textContent && details[3]?.textContent.trim(),
              oneWeekChange:
                details[4].textContent && details[4]?.textContent.trim(),
              oneMonthChange:
                details[5].textContent &&
                details[5]?.textContent.trim().length > 0
                  ? details[5]?.textContent.trim()
                  : "-",
              tvl: details[6].textContent && details[6]?.textContent.trim(),
              bridgedTVL:
                details[5].textContent &&
                details[5]?.textContent.trim().length > 0
                  ? details[5]?.textContent.trim()
                  : "-",
              stables:
                details[8].textContent &&
                details[8]?.textContent.trim().length > 0
                  ? details[8]?.textContent.trim()
                  : "-",
              oneDayVolume:
                details[9].textContent && details[9]?.textContent.trim(),
              oneDayFees:
                details[10].textContent &&
                details[10]?.textContent.trim().length > 0
                  ? details[10]?.textContent.trim()
                  : "-",
              mcapToTVL:
                details[11].textContent &&
                details[11]?.textContent.trim().length > 0
                  ? details[11]?.textContent.trim()
                  : "-",
              totalBridged:
                details[12].textContent &&
                details[12]?.textContent.trim().length > 0
                  ? details[12]?.textContent.trim()
                  : "-",
            };
          });
        });
      };

      await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight || totalHeight >= 400) {
              clearInterval(timer);
              resolve(null);
            }
          }, 100);
        });
      });

      const data = await extractData();

      await browser.close();

      const filteredData = data.filter(
        (chain: any) => !chainsToRemove.includes(chain.name)
      );

      const limitedData = filteredData.slice(0, 10);
      return limitedData;
    }
  } catch (err) {
    console.log("An error occurred:", err);
    return [];
  }
};

const parseTVL = (tvl: string): number => {
  const value = parseFloat(tvl.slice(1));
  const suffix = tvl[tvl.length - 1];

  switch (suffix) {
    case "b":
      return value * 1e9;
    case "m":
      return value * 1e6;
    default:
      return value;
  }
};
