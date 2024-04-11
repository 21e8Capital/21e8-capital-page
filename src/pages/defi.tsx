import { GetStaticProps } from "next";

import DexTable from "@/components/common/DexTable";
import { dexColumns, perpColumns } from "@/components/common/DexTable/columns";
import { scrapePerp, scrapeExchanges } from "@/utils/scraper";

const Defi = ({ dex, topPerp }: any) => {
  return (
    <div className="defi">
      <h1>Defi Price Data</h1>
      <p>Top 10 Cryptocurrency Decentralized Exchanges</p>
      <DexTable title="DEX" data={dex} columns={dexColumns} />
      <DexTable
        title="Top 10 Richest Perpetual Protocol (PERP) Adresses"
        data={topPerp}
        columns={perpColumns}
      />
    </div>
  );
};

export default Defi;

export const getStaticProps: GetStaticProps = async () => {
  const dex = await scrapeExchanges();
  const topPerp = await scrapePerp();

  return {
    props: {
      dex,
      topPerp,
    },
    revalidate: 43200,
  };
};
