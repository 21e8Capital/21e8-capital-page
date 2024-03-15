import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { formattedMarketStats } from "@/utils/api";
import captureScreenshots from "@/utils/captureDom";
import { scrapeEtfFlows } from "@/utils/scraper/etfFlows";
import { fetchGoogleTrends } from "@/utils/api/googlTrends";
import { getPerformanceStats } from "@/utils/database/performanceStats";
import { HalvingView } from "@/components/bitcoin";
import { ChartWrapper, PriceTable } from "@/components/common";

interface PriceDataProps {
  performance: PerformanceDataType[];
  marketStats: any;
  googleTrends: any;
  etfData: any;
}

const interestChartConfig = {
  type: "line",
  dataKey: "interest",
  stroke: "#FFC403",
};

const etfTrackerConfig = {
  type: "line-bar",
  lineDataKey: "cumulativeTotal",
  barDataKey: "dailyTotalExcludingGBTC",
  lineStroke: "#fff",
  barFill: "#FFC403",
  barLabel: "Daily ETF Flows",
  lineLabel: "Total Net BTS flows to ETFs",
};

const PriceData = ({
  etfData,
  marketStats,
  performance,
  googleTrends,
}: PriceDataProps) => {
  const [imagesToDownload, setImagesToDownload] = useState<
    { [key: string]: string }[]
  >([]);

  const shareLinks = {
    bitcoinMarketStats: {
      url: `${window.location.href}#market-stats`,
      title: "21e8.Capital - Bitcoin Market Stats",
    },
    bitcoinPerformance: {
      url: `${window.location.href}#performance`,
      title: "21e8.Capital - Bitcoin Performance",
    },
    etfTracker: {
      url: `${window.location.href}#etf-tracker`,
      title: "21e8.Capital - Bitcoin Etf Tracker",
    },
    interestOverTime: {
      url: `${window.location.href}#interest-over-time`,
      title: "21e8.Capital - Bitcoin Interest Over Time",
    },
  };

  useEffect(() => {
    const handleImageSaving = async () => {
      const imageIds = [
        "market-stats",
        "performance",
        "etf-tracker",
        "interest-over-time",
      ];

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
    <div className="price-data">
      <PriceTable
        title="Bitcoin Price Data"
        performance={performance}
        marketStats={marketStats}
      />
      <ChartWrapper
        legend
        graphics
        id="etf-tracker"
        chartType={etfTrackerConfig}
        data={etfData}
        header="Etf Tracker"
        subheader="Daily & Total To Date Inflows (Excluding Grayscale)"
        share={shareLinks.etfTracker}
        downloadImage={
          imagesToDownload["etf-tracker" as keyof typeof imagesToDownload]
        }
      />
      <HalvingView />
      <ChartWrapper
        id="interest-over-time"
        info={{
          title: "Interest Over Time",
          desc: "Google Trends data shows the relative popularity of search terms over time. Interest is represented on a scale from 0 to 100, where 100 is the most popular term.",
        }}
        chartType={interestChartConfig}
        data={googleTrends}
        header="Retail Interest"
        share={shareLinks.interestOverTime}
        downloadImage={
          imagesToDownload[
            "interest-over-time" as keyof typeof imagesToDownload
          ]
        }
      />
    </div>
  );
};

export default PriceData;

export const getStaticProps: GetStaticProps = async () => {
  let performance, marketStats, googleTrends, etfData;

  performance = await getPerformanceStats("btc");
  marketStats = await formattedMarketStats("btc");
  googleTrends = await fetchGoogleTrends("bitcoin");
  etfData = await scrapeEtfFlows();

  return {
    props: {
      performance: performance?.data ?? [],
      marketStats: marketStats ?? [],
      googleTrends: googleTrends ?? [],
      etfData: etfData?.dailyFlows ?? [],
    },
    revalidate: 43200,
  };
};
