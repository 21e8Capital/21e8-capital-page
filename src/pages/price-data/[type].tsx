import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { bookmarks } from "@/copy/text";
import { ListingText, PriceTable, WorkInProgress } from "@/components/common";
import { assetTypeMapping, getPricePerformance } from "@/utils/api";

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
          <PriceTable title="Bitcoin Price Data" performance={performance} />
          <ListingText
            title={bookmarks.title}
            subtitle={bookmarks.subtitle}
            data={bookmarks.data}
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
  let performance;
  const type = params?.type as keyof typeof assetTypeMapping;

  if (type === "btc") {
    performance = await getPricePerformance(type);
  }

  return {
    props: {
      performance: performance ?? [],
    },
    revalidate: 86400,
  };
};
