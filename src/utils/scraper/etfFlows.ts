import { createBrowser } from "./createBrowser";

export const scrapeEtfFlows = async () => {
  const browser = await createBrowser();

  if (browser) {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Safari/537.36"
    );

    await page.goto("https://www.coinglass.com/bitcoin-etf", {
      waitUntil: "networkidle0",
    });

    const tableSelector = ".etf-stop-table";
    await page.waitForFunction(
      (selector: string) => !!document.querySelector(selector),
      {},
      tableSelector
    );

    const data = await page.$$eval(`${tableSelector} tr`, (rows) => {
      return rows.map((row) => {
        return Array.from(row.querySelectorAll("td"), (cell) =>
          cell.textContent?.trim()
        );
      });
    });

    await browser.close();

    let sortedFormattedData = data
      .filter((row) => row[0] !== "Total" && row[0])
      .map((row) => {
        const values = row
          .slice(2, -1)
          .map((value) => (value ? parseValue(value) : 0));

        const dailyTotalExcludingGBTC = values.reduce(
          (acc, current) => acc + current,
          0
        );

        let dateRange = row[0]?.replace(/[\n\r]+/g, " ").trim();

        if (dateRange?.includes(" ")) {
          const dates = dateRange.split(" ");
          dateRange = `${formatDate(dates[1])} - ${formatDate(dates[0])}`;
        } else {
          dateRange = formatDate(dateRange!);
        }

        return {
          key: dateRange,
          dailyTotalExcludingGBTC,
        };
      })
      .sort(
        (a, b) =>
          new Date(a.key.split(" - ")[0]).getTime() -
          new Date(b.key.split(" - ")[0]).getTime()
      );

    let cumulativeTotal = 0;
    const inflowWithCumulativeTotal = sortedFormattedData.map((item, index) => {
      cumulativeTotal += item.dailyTotalExcludingGBTC;
      return {
        ...item,
        dailyTotalExcludingGBTC: item.dailyTotalExcludingGBTC.toFixed(2),
        cumulativeTotal: cumulativeTotal.toFixed(2),
      };
    });

    return {
      dailyFlows: inflowWithCumulativeTotal.filter(
        (item) => !isNaN(Number(item.dailyTotalExcludingGBTC))
      ),
    };
  }
};

const parseValue = (value: string) => {
  const multiplier = value.endsWith("K") ? 1000 : 1;
  return parseFloat(value.replace(/[^\d.-]/g, "")) * multiplier;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};
