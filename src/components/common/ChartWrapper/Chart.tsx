import { LineChart, LineBarChart } from "./custom";
import Hoverable from "../Hoverable";
import { Download, Logo, Question } from "@/svg";
import styles from "./styles.module.scss";
import ShareButton from "../ShareButton";
import { Legend } from "recharts";
import { useState } from "react";

type ChartProps = {
  id?: string;
  data: any[];
  info?: { title: string; desc: string };
  share?: {
    title: string;
    url: string;
  };
  chartType: ChartTypeConfig;
  downloadImage?: any;
  legend?: boolean;
};

const Chart = ({
  id,
  data,
  info,
  share,
  legend,
  chartType,
  downloadImage,
}: ChartProps) => {
  const [legendView, setLegendView] = useState({
    [chartType.lineDataKey!]: true,
    [chartType.barDataKey!]: true,
  });

  const renderChart = (config: ChartTypeConfig) => {
    switch (config.type) {
      case "line":
        return (
          <LineChart
            data={data}
            dataKey={config.dataKey!}
            stroke={config.stroke!}
          />
        );
      case "line-bar":
        return (
          <LineBarChart
            data={data}
            lineDataKey={config.lineDataKey!}
            barDataKey={config.barDataKey!}
            lineStroke={config.lineStroke!}
            barFill={config.barFill!}
            legendView={legendView}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.chart}>
      <div className={styles.topSide}>
        {info && (
          <div className={styles.info}>
            <h3>{info.title}</h3>
            <Hoverable content={info.desc}>
              <Question />
            </Hoverable>
          </div>
        )}
        {legendView && (
          <div className={styles.legend}>
            <div
              className={styles.wrapper}
              style={{
                opacity: legendView[chartType.lineDataKey!] ? 1 : 0.5,
              }}
              onClick={() =>
                setLegendView({
                  ...legendView,
                  [chartType.lineDataKey!]: !legendView[chartType.lineDataKey!],
                })
              }
            >
              <div
                className={styles.circle}
                style={{
                  backgroundColor: chartType.lineStroke,
                }}
              ></div>
              <p>{chartType.lineLabel}</p>
            </div>
            <div
              className={styles.wrapper}
              onClick={() =>
                setLegendView({
                  ...legendView,
                  [chartType.barDataKey!]: !legendView[chartType.barDataKey!],
                })
              }
              style={{
                opacity: legendView[chartType.barDataKey!] ? 1 : 0.5,
              }}
            >
              <div
                className={styles.circle}
                style={{
                  backgroundColor: chartType.barFill,
                }}
              ></div>
              <p>{chartType.barLabel}</p>
            </div>
          </div>
        )}
        <a
          className="ml-auto download opacity-0 transition-all transition-300ms absolute right-20"
          href={downloadImage}
          download={`${id}.jpg`}
        >
          <Download />
        </a>
        {share?.url && (
          <div className="absolute right-8">
            <ShareButton url={share.url} title={share.title} />
          </div>
        )}
      </div>
      <div id={id} className={styles.chartContainer}>
        {renderChart(chartType)}
        <div className={styles.radialGradient}></div>
        <Logo className={styles.logo} />
      </div>
    </div>
  );
};

export default Chart;
