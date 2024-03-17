import { defILama, defILamaCoins } from "../axios";

export const fetchStats = async () => {
  try {
    const responseTVL = await defILama.get(`/v2/historicalChainTvl`);
    const responseFees = await defILama.get(
      `/summary/fees/ethereum?dataType=dailyFees`
    );
    const responseRevenue = await defILama.get(
      `/summary/fees/ethereum?dataType=dailyRevenue`
    );

    const formattedData = responseTVL.data.map(
      (item: { date: number; tvl: number }) => ({
        key: formatDate(item.date),
        tvl: item.tvl,
      })
    );

    return {
      tvl: formattedData,
      fees: responseFees.data.totalDataChart.map((item: any) => ({
        key: formatDate(item[0]),
        fees: item[1],
      })),
      revenue: responseRevenue.data.totalDataChart.map((item: any) => ({
        key: formatDate(item[0]),
        revenue: item[1],
      })),
    };
  } catch (err) {
    console.error("Error fetching TVL: ", err);
    return [];
  }
};

export const fetchPrices = async () => {
  const today = new Date();
  const unixTimestamp = Math.floor(today.getTime() / 1000);

  const coinsToFetch = [
    {
      key: "coingecko:ethereum",
      stroke: "#81A8F9",
      isActive: false,
    },
    {
      key: "coingecko:tron",
      stroke: "#FE0213",
      isActive: false,
    },
    {
      key: "coingecko:cardano",
      stroke: "#2E69CC",
      isActive: false,
    },
    {
      key: "coingecko:avalanche-2",
      stroke: "#EF4443",
      isActive: false,
    },
    {
      key: "coingecko:thorchain",
      stroke: "#26E5C0",
      isActive: true,
    },
    {
      key: "coingecko:aptos",
      stroke: "#494036",
      isActive: false,
    },
    {
      key: "coingecko:optimism",
      stroke: "#FB0715",
      isActive: false,
    },
    {
      key: "coingecko:matic-network",
      stroke: "#8C44EE",
      isActive: false,
    },
    {
      key: "coingecko:arbitrum",
      stroke: "#5372E5",
      isActive: false,
    },
    {
      key: "coingecko:solana",
      stroke: "#AE63F0",
      isActive: false,
    },
  ];

  const firstPart = coinsToFetch.splice(0, 5);
  const secondPart = coinsToFetch;

  const firstPartFetch = firstPart.map((coin) => coin.key).join(",");
  const secondPartFetch = secondPart.map((coin) => coin.key).join(",");

  try {
    const { data: firstPartData } = await defILamaCoins.get(
      `/chart/${firstPartFetch}?end=${unixTimestamp}&span=500&period=1w&searchWidth=300`
    );

    const { data: secondPartData } = await defILamaCoins.get(
      `/chart/${secondPartFetch}?end=${unixTimestamp}&span=500&period=1w&searchWidth=300`
    );

    const formattedData = Object.entries(firstPartData.coins).reduce(
      (result: any[], [key, value]: [string, any]) => {
        const symbol = value.symbol;
        const prices = value.prices.map((price: any) => ({
          key: formatDate(price.timestamp),
          price: price.price,
        }));
        result.push({
          key: symbol,
          data: prices,
          stroke: firstPart.find((coin) => coin.key === key)?.stroke,
          isActive: firstPart.find((coin) => coin.key === key)?.isActive,
        });
        return result;
      },
      []
    );

    const secondFormattedData = Object.entries(secondPartData.coins).reduce(
      (result: any[], [key, value]: [string, any]) => {
        const symbol = value.symbol;
        const prices = value.prices.map((price: any) => ({
          key: formatDate(price.timestamp),
          price: price.price,
        }));
        result.push({
          key: symbol,
          data: prices,
          stroke: secondPart.find((coin) => coin.key === key)?.stroke,
          isActive: secondPart.find((coin) => coin.key === key)?.isActive,
        });
        return result;
      },
      []
    );

    const mergedData = [...formattedData, ...secondFormattedData];

    return mergedData;
  } catch (err) {
    console.error("Error fetching prices: ", err);
    return [];
  }
};

const formatDate = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  const formattedDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;
  return formattedDate;
};
