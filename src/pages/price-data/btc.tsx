import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { HalvingView } from "@/components/bitcoin";
import { ChartWrapper, PriceTable } from "@/components/common";
import { formattedMarketStats } from "@/utils/api";
import { getPerformanceStats } from "@/utils/database/performanceStats";
import { fetchGoogleTrends } from "@/utils/api/googlTrends";
import { scrapeEtfFlows } from "@/utils/scraper/etfFlows";
import axios from "axios";
import html2canvas from "html2canvas";

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
};

const PriceData = ({
  etfData,
  marketStats,
  performance,
  googleTrends,
}: PriceDataProps) => {
  const shareLinks = {
    bitcoinMarketStats: {
      url: `${window.location.href}#market-stats`,
      title: "Bitcoin Market Stats",
    },
    bitcoinPerformance: {
      url: `${window.location.href}#performance`,
      title: "Bitcoin Performance",
    },
    etfTracker: {
      url: `${window.location.href}#etf-tracker`,
      title: "Etf Tracker",
    },
    interestOverTime: {
      url: `${window.location.href}#interest-over-time`,
      title: "Interest Over Time",
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

      const imageData = await Promise.all(
        imageIds.map(async (id) => {
          const element = document.getElementById(id);
          if (element) {
            const canvas = await html2canvas(element, {
              windowWidth: 1920,
              windowHeight: 1080,
            });
            return {
              image: canvas.toDataURL("image/png"),
              fileName: `${id}`,
            };
          } else {
            return null;
          }
        })
      );

      const validImageData = imageData.filter((data) => data !== null);

      try {
        await axios.post("/api/saveImages", {
          images: validImageData,
        });
        console.log("Images captured and saved successfully");
      } catch (error) {
        console.error("Error capturing and saving images:", error);
      }
    };

    const imageSavingTimeout = setTimeout(() => {
      handleImageSaving();
    }, 5000);

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
        id="etf-tracker"
        chartType={etfTrackerConfig}
        data={etfData}
        header="Etf Tracker"
        subheader="Daily & Total To Date Inflows (Excluding Grayscale)"
        share={shareLinks.etfTracker}
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
