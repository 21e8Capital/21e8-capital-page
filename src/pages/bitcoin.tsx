import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { formattedMarketStats } from "@/utils/api";
import captureScreenshots from "@/utils/captureDom";
import { scrapeEtfFlows } from "@/utils/scraper/etfFlows";
import { fetchGoogleTrends } from "@/utils/api/googlTrends";
import { getPerformanceStats } from "@/utils/database/performanceStats";
import { HalvingView } from "@/components/bitcoin";
import { ChartWrapper, PriceTable } from "@/components/common";
import { stockToFlow } from "@/data";

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
    stockToFlow: {
      url: `${window.location.href}#stock-to-flow`,
      title: "21e8.Capital - Bitcoin Stock To Flow",
    },
    interestOverTime: {
      url: `${window.location.href}#interest-over-time`,
      title: "21e8.Capital - Bitcoin Interest Over Time",
    },
  };

  const halvingDates = [1354060800, 1467936000, 1589155200, 1714262400];

  useEffect(() => {
    const handleImageSaving = async () => {
      const imageIds = [
        "market-stats",
        "performance",
        "etf-tracker",
        "stock-to-flow",
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
    <div className="bitcoin-page">
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
        id="stock-to-flow"
        chartType={{
          type: "line",
        }}
        header="Stock to Flow"
        share={shareLinks.stockToFlow}
        downloadImage={
          imagesToDownload["stock-to-flow" as keyof typeof imagesToDownload]
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={600}
            data={stockToFlow}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="t"
              tickFormatter={(unixTime) => {
                const date = new Date(unixTime * 1000);
                const year = date.getFullYear();
                return year.toString();
              }}
              tickCount={1}
            />
            <YAxis scale="log" domain={["auto", "auto"]} /> <Tooltip />
            <Line
              type="monotone"
              dataKey="o.price"
              stroke="transparent"
              dot={({ payload, cx, cy }) => {
                if (!payload.o.price) return <></>;
                const color = getColor(payload.o.daysTillHalving);
                return (
                  <svg>
                    <circle cx={cx - 1} cy={cy - 1} r={2} fill={color} />
                  </svg>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="o.ratio"
              stroke="#82ca9d"
              dot={false}
            />
            {halvingDates.map((ts) => (
              <ReferenceLine x={ts} stroke="#777777" strokeDasharray="3 3" />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
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
  const etfData = await scrapeEtfFlows();
  const performance = await getPerformanceStats("btc");
  const marketStats = await formattedMarketStats("btc");
  const googleTrends = await fetchGoogleTrends("bitcoin");

  return {
    props: {
      marketStats: marketStats ?? [],
      googleTrends: googleTrends ?? [],
      etfData: etfData?.dailyFlows ?? [],
      performance: performance?.data ?? [],
    },
    revalidate: 43200,
  };
};
function getColor(num: number) {
  const normalizedNum = num / 1400;

  const colors = [
    { color: [128, 0, 128], range: [0, 0.143] },
    { color: [0, 0, 255], range: [0.143, 0.286] },
    { color: [0, 255, 255], range: [0.286, 0.429] },
    { color: [0, 255, 0], range: [0.429, 0.572] },
    { color: [255, 255, 0], range: [0.572, 0.715] },
    { color: [255, 165, 0], range: [0.715, 0.858] },
    { color: [255, 0, 0], range: [0.858, 1] },
  ];

  for (let i = 0; i < colors.length; i++) {
    if (
      normalizedNum >= colors[i].range[0] &&
      normalizedNum <= colors[i].range[1]
    ) {
      const rangeSize = colors[i].range[1] - colors[i].range[0];
      const positionInRange = (normalizedNum - colors[i].range[0]) / rangeSize;

      // If it's not the last color, interpolate with the next color
      if (i < colors.length - 1) {
        const nextColor = colors[i + 1].color;
        const color = colors[i].color.map((c, index) =>
          Math.round(
            c * (1 - positionInRange) + nextColor[index] * positionInRange
          )
        );
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      }

      // If it's the last color, just return it
      const color = colors[i].color;
      return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }
  }
}
