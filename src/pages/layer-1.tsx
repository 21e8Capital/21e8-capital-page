import { ChartWrapper, WorkInProgress } from "@/components/common";
import { fetchPrices, fetchStats } from "@/utils/api/defi-lama";
import captureScreenshots from "@/utils/captureDom";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

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

const Layer1 = ({ stats, prices }: any) => {
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
    </div>
  );
};

export default Layer1;

export const getStaticProps: GetStaticProps = async () => {
  const stats = await fetchStats();
  const prices = await fetchPrices();

  return {
    props: {
      stats,
      prices,
    },
    revalidate: 43200,
  };
};
