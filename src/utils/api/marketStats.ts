import {
  blockchairApi,
  cryptoCompareApiData,
  cryptoCompareApiMining,
} from "../axios";
import { assetTypeMapping } from ".";
import { getMarketStats } from "../database";

const cryptoCompareMapping = {
  btc: "BTC",
  "layer-1": "ETH",
};

const metricLabels: { [key: string]: string } = {
  circulatingSupply: "Circulating Supply",
  hashRate: "Hash Rate (TH/s)",
  marketCap: "Market Cap",
  activeAddresses: "Active Addresses",
  cdd: "Coins Days Destroyed",
};

export const getMarketPerformance = async (type: string) => {
  try {
    const { data: blockchairData } = await blockchairApi.get(
      `/${assetTypeMapping[type as keyof typeof assetTypeMapping]}/stats`
    );

    const { data: marketStatsData } = await cryptoCompareApiData.get(
      `/asset/v1/data/by/symbol?asset_symbol=${
        cryptoCompareMapping[type as keyof typeof cryptoCompareMapping]
      }`
    );

    const { data: miningStatsData } = await cryptoCompareApiMining.get(
      `/data/blockchain/latest?fsym=${
        cryptoCompareMapping[type as keyof typeof cryptoCompareMapping]
      }`
    );

    const { cdd_24h } = blockchairData.data;
    const { active_addresses, hashrate } = miningStatsData.Data;
    const { SUPPLY_CIRCULATING, TOTAL_MKT_CAP_USD } = marketStatsData.Data;

    return {
      type,
      circulatingSupply: SUPPLY_CIRCULATING.toFixed(2),
      hashRate: hashrate.toFixed(2),
      activeAddresses: active_addresses,
      marketCap: TOTAL_MKT_CAP_USD.toFixed(2),
      cdd: cdd_24h,
    };
  } catch (err: any) {
    console.log(err);
  }
};

export const formattedMarketStats = async (
  type: keyof typeof assetTypeMapping
) => {
  try {
    const marketStats = await getMarketStats(type);

    if (marketStats.data && marketStats.data.length < 7) {
      return [
        {
          label: metricLabels.circulatingSupply,
          latest: marketStats.data[0].circulatingSupply,
        },
        {
          label: metricLabels.hashRate,
          latest: marketStats.data[0].hashRate,
        },
        {
          label: metricLabels.marketCap,
          latest: marketStats.data[0].marketCap,
        },
        {
          label: metricLabels.activeAddresses,
          latest: marketStats.data[0].activeAddresses,
        },
        {
          label: metricLabels.cdd,
          latest: marketStats.data[0].cdd,
        },
      ];
    }

    return calculateChanges(marketStats.data);
  } catch (err) {
    console.log(err);
  }
};

const calculateChangePercentage = (newValue: number, oldValue: number) => {
  return Number(((newValue - oldValue) / oldValue) * 100).toFixed(2);
};

const calculateChanges = (data: any) => {
  const firstDay = data[0];
  const lastDay = data[6];

  let changes: any = [];

  Object.keys(metricLabels).forEach((metric) => {
    if (["id", "created_at", "type"].includes(metric)) {
      return;
    }

    const label = metricLabels[metric];
    const lastDayValue = lastDay[metric];
    const firstDayValue = firstDay[metric];
    const changeInNumber = (lastDayValue - firstDayValue).toFixed(2);
    const changeInPercent = calculateChangePercentage(
      lastDayValue,
      firstDayValue
    );

    changes = [
      ...changes,
      {
        latest: lastDayValue,
        label,
        changeInNumber,
        changeInPercent,
      },
    ];
  });

  return changes;
};
