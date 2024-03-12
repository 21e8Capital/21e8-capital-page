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
