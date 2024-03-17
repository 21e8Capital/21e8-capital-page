import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { ChartWrapper, Layer1Table } from "@/components/common";
import { layer1Top } from "@/components/common/Layer1Table/columns";
import { fetchPrices, fetchStats } from "@/utils/api/defi-lama";
import captureScreenshots from "@/utils/captureDom";
import { scrapeLayer1Chains } from "@/utils/scraper/laye1chains";

const statsChartConfig: Layer1Charts = {
  chartViewTypes: ["tvl", "fees", "revenue"],
  type: "area-single",
  charts: [
    {
      dataKey: "tvl",
      stroke: "#FFC403",
    },
    {
      dataKey: "fees",
      stroke: "#FFC403",
    },
    {
      dataKey: "revenue",
      stroke: "#FFC403",
    },
  ],
};

const Layer1 = ({ stats, prices, topChains }: any) => {
  const [imagesToDownload, setImagesToDownload] = useState<
    { [key: string]: string }[]
  >([]);

  const shareLinks = {
    layer1TVL: {
      url: `${window.location.href}#layer-1-stats`,
      title: "21e8.Capital - Layer 1 Stats",
    },
  };

  useEffect(() => {
    const handleImageSaving = async () => {
      const imageIds = ["layer-1-stats", "layer-1-prices"];

      const images = await captureScreenshots(imageIds, "/api/saveImages");

      setImagesToDownload(
        // @ts-ignore
        images.reduce(
          (acc, { fileName, image }) => ({
            ...acc,
            [fileName]: image,
          }),
          {}
        )
      );
    };

    const imageSavingTimeout = setTimeout(() => {
      handleImageSaving();
    }, 2000);

    return () => {
      clearTimeout(imageSavingTimeout);
    };
  }, []);

  return (
    <div className="bitcoin-page">
      <ChartWrapper
        id="layer-1-stats"
        chartType={statsChartConfig}
        data={stats}
        header="Layer 1 Price Data"
        share={shareLinks.layer1TVL}
        downloadImage={
          imagesToDownload["layer-1-stats" as keyof typeof imagesToDownload]
        }
      />
      <ChartWrapper
        graphics
        id="layer-1-prices"
        chartType={{
          datasets: prices,
          type: "area-multiple",
        }}
        share={shareLinks.layer1TVL}
        downloadImage={
          imagesToDownload["layer-1-prices" as keyof typeof imagesToDownload]
        }
      />
      <Layer1Table data={topChains} title="Top 10 Chains" columns={layer1Top} />
    </div>
  );
};

export default Layer1;

export const getStaticProps: GetStaticProps = async () => {
  const stats = await fetchStats();
  const prices = await fetchPrices();
  const topChains = await scrapeLayer1Chains();

  return {
    props: {
      stats,
      prices,
      topChains,
    },
    revalidate: 43200,
  };
};
