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
  img?: string;
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

interface ChartInfoProps {
  title: string;
  desc: string;
}

interface ChartTypeConfig {
  type: string;
  dataKey?: string;
  stroke?: string;
  barDataKey?: string;
  fill?: string;
  lineDataKey?: string;
  lineStroke?: string;
  barFill?: string;
  barLabel?: string;
  lineLabel?: string;
  datasets?: Dataset;
}

interface CustomBarLabelProps {
  index: number;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageTypeData {
  image: string;
  fileName: string;
}

interface ChartData {
  key?: string;
  type: string;
  dataKey: string;
  stroke: string;
}

interface Layer1Charts {
  chartViewTypes: string[];
  type: string;
  charts: {
    dataKey: string;
    stroke: string;
  }[];
}

type Dataset = {
  data: any[];
  key: string;
  stroke: string;
  isActive: boolean;
};

interface Layer1Chains {
  name: string;
  imageUrl: string;
  protocols: string;
  activeAddresses: string;
  oneDayChange: string;
  oneWeekChange: string;
  oneMonthChange: string;
  tvl: string;
  bridgedTVL: string;
  stables: string;
  oneDayVolume: string;
  oneDayFees: string;
  mcapToTVL: string;
  totalBridged: string;
}

interface Perp {
  "#": string;
  address: string;
  quantity: string;
  percentage: string;
  "7d change": string;
}

interface Dex {
  "#": string;
  name: string;
  logoUrl: string;
  volGraph: string;
  "trading volume(24h)": string;
  "% mkt share": string;
  noMarkets: string;
  type: string;
  launched: string;
}

type AssetTypeProp = keyof typeof assetTypeMapping;

declare module "dom-to-image" {
  export function toPng(node: Node, options?: any): Promise<string>;
  export function toJpeg(node: Node, options?: any): Promise<string>;
  export function toBlob(node: Node, options?: any): Promise<Blob>;
  export function toPixelData(
    node: Node,
    options?: any
  ): Promise<Uint8ClampedArray>;
  export function toSvg(node: Node, options?: any): Promise<string>;
}
