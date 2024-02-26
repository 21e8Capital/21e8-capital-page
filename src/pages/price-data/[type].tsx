import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { PriceTable, WorkInProgress } from "@/components/common";
import { assetTypeMapping, formattedMarketStats } from "@/utils/api";
import { bookmarks } from "@/copy/text";
import { getPerformanceStats } from "@/utils/database/performanceStats";

const staticPaths = ["btc", "layer-1", "defi"];

interface PriceDataProps {
  performance: PerformanceDataType[];
  marketStats: any;
}

const PriceData = ({ marketStats, performance }: PriceDataProps) => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      {type !== "btc" ? (
        <WorkInProgress />
      ) : (
        <div className="price-data">
          <PriceTable
            title="Bitcoin Price Data"
            performance={performance}
            marketStats={marketStats}
          />
        </div>
      )}
    </>
  );
};

export default PriceData;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = staticPaths.map((type) => ({ params: { type } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let performance, marketStats;
  const type = params?.type as keyof typeof assetTypeMapping;

  if (type === "btc") {
    performance = await getPerformanceStats(type);
    marketStats = await formattedMarketStats(type);
  }

  return {
    props: {
      performance: performance?.data ?? [],
      marketStats: marketStats,
    },
    revalidate: 86400,
  };
};
