import { cryptoCompareApiMining } from "../axios";

const axios = require("axios");

const btc_address = `bc1qxue8ytyxmc6e9t7cdmu4na64sryckyzq739m0luun8a8uf68kv2q9lndkg`;
const eth_address = `0x6FD1eAA27105AD4916C1bD1627F80240017B1824`;
const thor_address = `thor1eewa0w9p3tdvdfan8lfcc0w2f7ucflxfx3hg75`;
const sol_address = `FcsXxKpFCvp9QaLQP7J6unKHtEVqLFHZVFddA63RneK4`;

const bdSecret = process.env.BLOCK_DAEMON_KEY;

const one8 = 100000000;
const one9 = 1000000000;
const one18 = 1000000000000000000;

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
    const btcHistory = await axios.get(
      `https://mempool.space/api/address/${btc_address}/txs`
    );

    const btcBalResponse = await axios.get(
      `https://mempool.space/api/address/${btc_address}`
    );

    const { funded_txo_sum, spent_txo_sum } = btcBalResponse.data.chain_stats;

    const history = btcHistory.data.reverse().map((item: any) => ({
      time: getMonthFromTimestamp(item.status.block_time),
      value: calcBtcHistory(item, price),
    }));

    const btcBalance = (funded_txo_sum - spent_txo_sum) / one8;
    const btcValue = btcBalance * price;

    return {
      balance: btcBalance,
      value: btcValue,
      price: price,
      history,
    };
  } catch (error) {
    console.error("Error fetching Bitcoin data");
    throw error;
  }
}

export async function fetchL1Data(priceEth: number, priceSol: number) {
  try {
    const ethData = await fetchEthereumData(priceEth);
    const solData = await fetchSolanaData(priceSol);
    const history = [...solData.history, ...ethData.history];
    const totalValue = ethData.value + solData.value;
    return {
      balance: ethData.balance + solData.balance,
      value: totalValue,
      price: priceSol,
      history
    };
  } catch (error) {
    console.error("Error fetching Other data");
    throw error;
  }
}

export async function fetchEthereumData(price: number) {
  try {
    const ethHistory = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${eth_address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    );

    const ethBalResponse = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`
    );

    const ethBalance = ethBalResponse.data.result / one18;

    const history = ethHistory.data.result.map((item: any) => ({
      time: getMonthFromTimestamp(item.timeStamp),
      value: (Number(item.value) / one18) * price,
    }));

    const ethValue = ethBalance * price;

    return {
      balance: ethBalance,
      value: ethValue,
      price: price,
      history,
    };
  } catch (error) {
    console.error("Error fetching Ethereum data");
    throw error;
  }
}

export async function fetchDefiData(priceRune: number, priceFlip: number) {
  try {
    const thorData = await fetchThorchainData(priceRune);
    const flipData = await fetchChainFlipData(priceFlip);
    const totalValue = thorData.value + flipData.value;
    return {
      balance: thorData.balance + flipData.balance,
      value: totalValue,
      price: NaN,
    };
  } catch (error) {
    console.error("Error fetching Defi data");
    throw error;
  }
}

export async function fetchThorchainData(price: number) {
  try {
    const url = "https://midgard.ninerealms.com/v2/balance/"
    const thorBalResponse = await axios.get(`${url}${thor_address}`)

    const thorBalance = thorBalResponse.data?.coins[0].amount / one8;
    console.log(thorBalance);

    const thorValue = thorBalance * price;
    console.log("price: ", price);

    console.log(thorValue);
    return { balance: thorBalance, value: thorValue, price: price };
  } catch (error) {
    console.error("Error fetching THORChain data");
    throw error;
  }
}

export async function fetchChainFlipData(price: number) {
  try {
    const flipBalance = 238095;

    const flipValue = flipBalance * price;

    return { balance: flipBalance, value: flipValue, price: price };
  } catch (error) {
    console.error("Error fetching ChainFlip data");
    throw error;
  }
}

export async function fetchOtherData(price: number) {
  try {
    const usdcData = await fetchUSDCData(price);
    return {
      balance: usdcData.balance,
      value: usdcData.value,
      price: price,
    };
  } catch (error) {
    console.error("Error fetching Other data");
    throw error;
  }
}

export async function fetchSolanaData(price: number) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${bdSecret}`,
      },
    };

    const solBalResponse = await axios.get(
      `https://svc.blockdaemon.com/universal/v1/solana/mainnet/account/${sol_address}`,
      config
    );

    const solBalResponseHistory = await axios.get(
      `https://svc.blockdaemon.com/universal/v1/solana/mainnet/account/${sol_address}/txs`,
      config
    );

    const solBalance = solBalResponse.data[0]?.confirmed_balance / one9;

    const solValue = solBalance * price;

    const history = solBalResponseHistory.data.data
      .reverse()
      .map((item: any) => ({
        time: getMonthFromTimestamp(item.date),
        value: calcTransaction(item, price),
      }));

    // (item.events[1].amount / one9) * solPrice,
    return { balance: solBalance, value: solValue, price: price, history };
  } catch (error) {
    console.error("Error fetching Solana data");
    throw error;
  }
}

export async function fetchUSDCData(price: number) {
  try {
    const usdcBalance = 100000;

    const usdcValue = usdcBalance * price;

    return { balance: usdcBalance, value: usdcValue, price: price };
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
