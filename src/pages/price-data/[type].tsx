import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { HalvingView } from "@/components/bitcoin";
import { ChartWrapper, PriceTable, WorkInProgress } from "@/components/common";
import { assetTypeMapping, formattedMarketStats } from "@/utils/api";
import { getPerformanceStats } from "@/utils/database/performanceStats";
import { fetchGoogleTrends } from "@/utils/api/googlTrends";

const staticPaths = ["btc", "layer-1", "defi"];

interface PriceDataProps {
  performance: PerformanceDataType[];
  marketStats: any;
  googleTrends: any;
}

const PriceData = ({
  marketStats,
  performance,
  googleTrends,
}: PriceDataProps) => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      {type === "layer-1" || type === "defi" ? (
        <WorkInProgress />
      ) : (
        <div className="price-data">
          <PriceTable
            title="Bitcoin Price Data"
            performance={performance}
            marketStats={marketStats}
          />
          <HalvingView />
          <ChartWrapper
            info={{
              title: "Interest Over Time",
              desc: "Google Trends data shows the relative popularity of search terms over time. Interest is represented on a scale from 0 to 100, where 100 is the most popular term.",
            }}
            data={googleTrends}
            header="Retail Interest"
            share={true}
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
  let performance, marketStats, googleTrends;
  const type = params?.type as keyof typeof assetTypeMapping;

  if (type === "btc") {
    performance = await getPerformanceStats(type);
    marketStats = await formattedMarketStats(type);
    googleTrends = await fetchGoogleTrends("bitcoin");
  }

  return {
    props: {
      performance: performance?.data ?? [],
      marketStats: marketStats ?? [],
      googleTrends: googleTrends ?? [],
    },
    revalidate: 43200,
  };
};
