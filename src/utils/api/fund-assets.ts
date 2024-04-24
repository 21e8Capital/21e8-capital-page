const axios = require("axios");

const btc_address = `bc1qxue8ytyxmc6e9t7cdmu4na64sryckyzq739m0luun8a8uf68kv2q9lndkg`;
const eth_address = `0x6FD1eAA27105AD4916C1bD1627F80240017B1824`;
const thor_address = `thor1eewa0w9p3tdvdfan8lfcc0w2f7ucflxfx3hg75`;
const sol_address = `FcsXxKpFCvp9QaLQP7J6unKHtEVqLFHZVFddA63RneK4`;

const bdSecret = process.env.BLOCK_DAEMON_KEY

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

export  function findBiggest(numbers: number[]) {
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

export async function fetchBitcoinData() {
  try {
    const btcHistory = await axios.get(
      `https://mempool.space/api/address/${btc_address}/txs`
    );

    const btcPriceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    const btcPrice = btcPriceResponse.data.bitcoin.usd;

    const btcBalResponse = await axios.get(
      `https://mempool.space/api/address/${btc_address}`
    );

    const { funded_txo_sum, spent_txo_sum } = btcBalResponse.data.chain_stats;

    const history = btcHistory.data.reverse().map((item: any) => ({
      time: getMonthFromTimestamp(item.status.block_time),
      value: (item.vout[0].value / one8) * btcPrice,
    }));

    const btcBalance = (funded_txo_sum - spent_txo_sum) / one8;
    const btcValue = btcBalance * btcPrice;

    return {
      balance: btcBalance,
      value: btcValue,
      price: btcPrice,
      history,
    };
  } catch (error) {
    console.error("Error fetching Bitcoin data");
    throw error;
  }
}

export async function fetchEthereumData() {
  try {
    const ethHistory = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${eth_address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    );

    const ethPriceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const ethPrice = ethPriceResponse.data.ethereum.usd;

    const ethBalResponse = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`
    );

    const ethBalance = ethBalResponse.data.result / one18;

    const history = ethHistory.data.result.map((item: any) => ({
      time: getMonthFromTimestamp(item.timeStamp),
      value: (Number(item.value) / one18) * ethPrice,
    }));

    const ethValue = ethBalance * ethPrice;

    return {
      balance: ethBalance,
      value: ethValue,
      price: ethPrice,
      history,
    };
  } catch (error) {
    console.error("Error fetching Ethereum data");
    throw error;
  }
}

export async function fetchThorchainData() {
  try {
    const thorPriceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=thorchain&vs_currencies=usd"
    );
    const thorPrice = thorPriceResponse.data.thorchain.usd;

    const thorBalResponse = await axios.get(
      `https://thornode.ninerealms.com/cosmos/bank/v1beta1/balances/${thor_address}`
    );
    const thorBalance = thorBalResponse.data.balances[0].amount / one8;

    const thorValue = thorBalance * thorPrice;

    return { balance: thorBalance, value: thorValue, price: thorPrice };
  } catch (error) {
    console.error("Error fetching THORChain data");
    throw error;
  }
}

export async function fetchSolanaData() {
  try {
    const solPriceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const solPrice = solPriceResponse.data.solana.usd;

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

    const solValue = solBalance * solPrice;

    const history = solBalResponseHistory.data.data.reverse().map((item: any) => ({
      time: getMonthFromTimestamp(item.date),
      value: (item.events[1].amount / one9) * solPrice,
    }));

    return { balance: solBalance, value: solValue, price: solPrice, history };
  } catch (error) {
    console.error("Error fetching Solana data");
    throw error;
  }
}
