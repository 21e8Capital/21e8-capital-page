interface HalveningData {
  halvening_time: string;
  seconds_left: number;
}
interface EmissionData {
  "24hr_kWh": string;
  "24hr_kgCO2": string;
  Output_kWh: string;
  Output_kgCO2: string;
}

interface Listing {
  title: string;
  para: string;
  url?: string;
  icon?: JSX.Element;
}

interface SectionData {
  title: string;
  subtitle?: string;
  para?: string;
  data: Listing[];
  icon?: JSX.Element;
}

interface PerformanceDataType {
  period: string;
  priceChange: string;
  percentageChange: string;
  highestPrice: string;
  type: string;
}

interface MarketStatsDataType {
  circulatingSupply: number;
  hashRate: number;
  marketCap: number;
  realizedCap?: number;
  activeAddresses: number;
  cdd: number;
  type: string;
}

interface FormattedMarketStats {
  latest: string;
  label: string;
  changeInNumber: string;
  changeInPercent: string;
}

type AssetTypeProp = keyof typeof assetTypeMapping;
