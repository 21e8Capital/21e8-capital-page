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
