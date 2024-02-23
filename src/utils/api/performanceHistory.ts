import { Mobula } from "mobula-sdk";
import { assetTypeMapping } from ".";
import { apiConfig } from "../axios/config";

const mobula = new Mobula({
  apiKeyAuth: apiConfig.mobula.key,
});

type AssetTypeProp = keyof typeof assetTypeMapping;

const fetchAssetMarketHistory = async (
  asset: string,
  from: number | null,
  to: number
) => {
  const marketData = await mobula.fetchAssetMarketHistory({
    asset,
    from: from!,
    to,
  });
  return marketData.marketHistoryResponse?.data?.priceHistory;
};

const fetchPerformanceData = async (
  asset: string,
  from: number,
  to: number
) => {
  const performanceData = await Promise.all([
    fetchAssetMarketHistory(asset, from - 60 * 60 * 1000, to), // 1h
    fetchAssetMarketHistory(asset, from - 24 * 60 * 60 * 1000, to), // 1d
    fetchAssetMarketHistory(asset, from - 7 * 24 * 60 * 60 * 1000, to), // 1w
    fetchAssetMarketHistory(asset, from - 30 * 24 * 60 * 60 * 1000, to), // 1m
    fetchAssetMarketHistory(asset, from - 3 * 30 * 24 * 60 * 60 * 1000, to), // 3m
    fetchAssetMarketHistory(asset, from - 365 * 24 * 60 * 60 * 1000, to), // 1y
    fetchAssetMarketHistory(asset, null, to), // All
  ]);
  return performanceData;
};

export const getPricePerformance = async (asset: AssetTypeProp) => {
  try {
    const currentUnixTimeMillis = Date.now();
    const fromMillis = currentUnixTimeMillis - 5 * 60 * 1000;

    const performanceData = await fetchPerformanceData(
      assetTypeMapping[asset],
      fromMillis,
      currentUnixTimeMillis
    );

    const formattedPerformanceData = performanceData.map((data, index) => {
      const { priceChange, percentageChange, highestPrice } =
        calculatePriceChange(data!);
      const period = getPeriodLabel(index);
      return { period, priceChange, percentageChange, highestPrice };
    });

    return formattedPerformanceData;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    return null;
  }
};

function calculatePriceChange(data: Record<string, any>[]) {
  const priceChange = data[data.length - 1][1] - data[0][1];
  const percentageChange = ((priceChange / data[0][1]) * 100).toFixed(2) + "%";
  const highestPrice = Math.max(...data.map((entry) => entry[1]));
  const highestPriceString = highestPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return {
    priceChange: formatPriceChange(priceChange),
    percentageChange,
    highestPrice: `$${highestPriceString}`,
  };
}

function getPeriodLabel(index: number) {
  const periods = ["1h", "1d", "1w", "1m", "3m", "1y", "All"];
  return periods[index];
}

function formatPriceChange(priceChange: number) {
  const formattedPriceChange = Math.abs(priceChange).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return priceChange < 0
    ? `-$${formattedPriceChange}`
    : `$${formattedPriceChange}`;
}
