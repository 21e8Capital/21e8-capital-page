import { cryptoCompareApiMining } from "../axios";
import { apiConfig } from "../axios/config";
import { format, startOfMonth, startOfYear, differenceInDays } from 'date-fns';
const axios = require("axios");



const bdSecret = process.env.BLOCK_DAEMON_KEY;
const BASE_URL = 'https://min-api.cryptocompare.com/data/v2/histoday';

interface HistoricalData {
  time: number;
  close: number;
}

const one8 = 100000000;
const one9 = 1000000000;
const one18 = 1000000000000000000;

const fetchDailyHistoricalData = async (token: string): Promise<HistoricalData[]> => {
  const today = new Date();
  const startOfYearDate = startOfYear(today);
  const daysSinceStartOfYear = differenceInDays(today, startOfYearDate);
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        fsym: token,
        tsym: 'AUD',
        limit: daysSinceStartOfYear,
        api_key: apiConfig.cryptoCompare.key,
      },
    });
    if (response.data && response.data.Data && response.data.Data.Data) {
      return response.data.Data.Data as HistoricalData[];
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const calculateMonthlyAverages = (data: HistoricalData[]): { [key: string]: number } => {
  const monthlySums: { [key: string]: { sum: number, count: number } } = {};
  const monthlyAverages: { [key: string]: number } = {};
  data.forEach((entry) => {
    const date = new Date(entry.time * 1000);
    const monthStart = startOfMonth(date);
    const monthKey = format(monthStart, 'MMM');

    if (!monthlySums[monthKey]) {
      monthlySums[monthKey] = { sum: 0, count: 0 };
    }
    monthlySums[monthKey].sum += entry.close;
    monthlySums[monthKey].count += 1;
  });

  Object.keys(monthlySums).forEach((monthKey) => {
    const { sum, count } = monthlySums[monthKey];
    monthlyAverages[monthKey] = Number((sum / count).toFixed(2));
  });

  return monthlyAverages;
};

export const formatCurrency = (value: any) => {
  return value?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export function findBiggest(numbers: number[]) {
  // Use reduce to find the biggest number
  return numbers.reduce((biggest, current) => {
    return current > biggest ? current : biggest;
  }, numbers[0]); // Start with the first number as the initial biggest
}

function getMonthFromTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const monthIndex = date.getMonth();

  return {
    month: date.toLocaleString("default", { month: "short" }),
    index: monthIndex,
  };
}

export async function fetchBitcoinData(price: number) {
  try {
    const historicalData = await fetchDailyHistoricalData('BTC');
    const monthlyAverages = calculateMonthlyAverages(historicalData);
    let history: any = []
    const btcBalance = 74.41;
    Object.keys(monthlyAverages).forEach((key, index) => {
      history.push({ time: { month: key, index: index + 1 }, value: btcBalance * monthlyAverages[key] },)
    })
    return {
      balance: btcBalance,
      value: btcBalance * price,
      history
    };
  } catch (error) {
    console.error("Error fetching Bitcoin data");
    throw error;
  }
}

export async function fetchL1Data(ethPrice: number, solPrice: number) {
  try {
    const ethData = await fetchEthereumData();
    const solData = await fetchSolanaData();
    const history = [...ethData.history, ...solData.history]
    return {
      balance: ethData.balance + solData.balance,
      value: ethPrice * ethData.balance + solPrice * solData.balance,
      history
    };
  } catch (error) {
    console.error("Error fetching Other data");
    throw error;
  }
}

export async function fetchEthereumData() {
  try {
    const historicalData = await fetchDailyHistoricalData('ETH');
    const monthlyAverages = calculateMonthlyAverages(historicalData);
    let history: any = []
    const ethBalance = 496.15
    Object.keys(monthlyAverages).forEach((key, index) => {
      history.push({ time: { month: key, index: index + 1 }, value: ethBalance * monthlyAverages[key] },)
    })
    return {
      balance: ethBalance,
      history
    };
  } catch (error) {
    console.error("Error fetching Ethereum data");
    throw error;
  }
}

export async function fetchDefiData(runePrice: number, flipPrice: number) {
  try {
    const thorData = await fetchThorchainData();
    const flipData = await fetchChainFlipData();
    const history = [...thorData.history, ...flipData.history]
    return {
      balance: thorData.balance + flipData.balance,
      value: runePrice * thorData.balance + flipPrice * flipData.balance,
      history
    };
  } catch (error) {
    console.error("Error fetching Defi data");
    throw error;
  }
}

export async function fetchThorchainData() {
  try {
    const historicalData = await fetchDailyHistoricalData('RUNE');
    const monthlyAverages = calculateMonthlyAverages(historicalData);
    let history: any = []
    const runeBalance = 489566.67
    Object.keys(monthlyAverages).forEach((key, index) => {
      history.push({ time: { month: key, index: index + 1 }, value: runeBalance * monthlyAverages[key] },)
    })
    return { balance: runeBalance, history };
  } catch (error) {
    console.error("Error fetching THORChain data");
    throw error;
  }
}

export async function fetchChainFlipData() {
  try {
    const flipBalance = 238095;
    const historicalData = await fetchDailyHistoricalData('FLIP');
    const monthlyAverages = calculateMonthlyAverages(historicalData);
    let history: any = []
    Object.keys(monthlyAverages).forEach((key, index) => {
      history.push({ time: { month: key, index: index + 1 }, value: flipBalance * monthlyAverages[key] },)
    })
    return { balance: flipBalance, history };
  } catch (error) {
    console.error("Error fetching ChainFlip data");
    throw error;
  }
}

export async function fetchOtherData(usdcPrice: number) {
  try {
    const usdcData = await fetchUSDCData();
    return {
      balance: usdcData.balance,
      value: usdcPrice * usdcData.balance,
      history: usdcData.history
    };
  } catch (error) {
    console.error("Error fetching Other data");
    throw error;
  }
}

export async function fetchSolanaData() {
  try {
    const historicalData = await fetchDailyHistoricalData('SOL');
    const monthlyAverages = calculateMonthlyAverages(historicalData);
    let history: any = []
    const solBalance = 4110;
    Object.keys(monthlyAverages).forEach((key, index) => {
      history.push({ time: { month: key, index: index + 1 }, value: solBalance * monthlyAverages[key] },)
    })

    return { balance: solBalance, history };
  } catch (error) {
    console.error("Error fetching Solana data");
    throw error;
  }
}

export async function fetchUSDCData() {
  try {
    const usdcBalance = 100000;
    const historicalData = await fetchDailyHistoricalData('USDC');
    const monthlyAverages = calculateMonthlyAverages(historicalData);
    let history: any = []
    Object.keys(monthlyAverages).forEach((key, index) => {
      history.push({ time: { month: key, index: index + 1 }, value: usdcBalance * monthlyAverages[key] },)
    })
    return { balance: usdcBalance, history };
  } catch (error) {
    console.error("Error fetching ChainFlip data");
    throw error;
  }
}

function calcTransaction(item: any, price: number) {
  const transaction = item.events
    .filter((item: any) => item.type === "transfer")
    .reduce((acc: number, curr: any) => acc + curr.amount, 0);
  return (transaction / one9) * price;
}

function calcBtcHistory(item: any, price: number) {
  const vin = item.vin.reduce(
    (acc: number, curr: any) => acc + curr.prevout.value,
    0
  );

  const result = vin / one8;
  return result * price;
}
