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
}

type AssetTypeProp = keyof typeof assetTypeMapping;
