export const assetTypeMapping = {
  btc: "bitcoin",
  "layer-1": "ethereum",
};

export { getPricePerformance } from "./performanceHistory";
export { getMarketPerformance, formattedMarketStats } from "./marketStats";
export { getHalvingData } from "./halving-and-emission";
export {
  fetchBitcoinData,
  fetchEthereumData,
  fetchSolanaData,
  fetchThorchainData,
} from "./fund-assets";
export { formatCurrency } from "./fund-assets";
