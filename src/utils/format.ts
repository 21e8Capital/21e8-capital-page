export const formatToE = (tvl: number) => {
  if (tvl >= 1e12) return `${(tvl / 1e12).toFixed(1)}tr`;
  if (tvl >= 1e9) return `${(tvl / 1e9).toFixed(1)}b`;
  if (tvl >= 1e6) return `${(tvl / 1e6).toFixed(1)}m`;
  if (tvl >= 1e3) return `${(tvl / 1e3).toFixed(1)}K`;
  return tvl.toString();
};
