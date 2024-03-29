import { assetTypeMapping } from ".";
import { blockchairApi, digiconomistApi } from "../axios";

export const getHalvingData = async (
  type: keyof typeof assetTypeMapping
): Promise<any> => {
  try {
    const halving = await blockchairApi.get(`/tools/halvening`);
    const inflation = await blockchairApi.get(`/bitcoin/stats`);
    const { circulation, inflation_24h } = inflation.data.data;
    const { seconds_left, halvening_time } = halving.data.data.bitcoin;
    const inflationRate = calculateInflationRate(inflation_24h, circulation);
    const emission = await getEmissions();

    return {
      countdown: displayHalveningCountdown({ seconds_left, halvening_time }),
      inflation: inflationRate,
      emission,
    };
  } catch (err: any) {
    console.log("Error fetching halving data: ", err.message);
  }
};

const getEmissions = async () => {
  try {
    const blockReward = 6.25;
    const minutesInDay = 24 * 60;
    const dailyEmissionRate = (minutesInDay / 10) * blockReward;
    const emissionRates = {
      currentEmission: dailyEmissionRate,
      forecastedEmission: dailyEmissionRate / 2,
    };

    return emissionRates;
  } catch (err: any) {
    console.log("Error fetching emissions: ", err.message);
    return { currentEmission: null, forecastedEmission: null };
  }
};

function formatCountdownTime(seconds: number): string {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedTime = `${days} days, ${hours} hours, ${minutes} minutes`;
  return formattedTime;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const options = { month: "long", year: "numeric" } as any;
  const restOfDate = date
    .toLocaleDateString("en-US", options)
    .replace(",", " ");

  return {
    day,
    restOfDate,
  };
}

function displayHalveningCountdown(halveningData: HalveningData) {
  const { seconds_left, halvening_time } = halveningData;

  const countdownTime = formatCountdownTime(seconds_left);
  const halveningDate = formatDate(halvening_time);

  return {
    countdownTime,
    halveningDate,
  };
}

function calculateInflationRate(inflationBTC: number, totalSupplyBTC: number) {
  const inflationRate = ((365 * inflationBTC) / totalSupplyBTC) * 100;
  const nextInfationRate = (((365 * inflationBTC) / totalSupplyBTC) * 100) / 2;

  return {
    currentInflationRate: inflationRate.toFixed(2),
    nextInfationRate: nextInfationRate.toFixed(2),
  };
}
