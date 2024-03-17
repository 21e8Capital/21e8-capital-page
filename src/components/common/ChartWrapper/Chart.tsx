import React, { useState } from "react";
import Hoverable from "../Hoverable";
import ShareButton from "../ShareButton";
import { LineChart, LineBarChart } from "./custom";
import { Download, Logo, Question } from "@/svg";
import styles from "./styles.module.scss";
import AreaLineChart from "./custom/AreaLineChartSingle";
import ChartLegend from "./ChartLegend";
import AreaLineChartMultiple from "./custom/AreaLineChartMultiple";

type ChartProps = {
  id?: string;
  data: any;
  info?: { title: string; desc: string };
  share?: {
    title: string;
    url: string;
  };
  chartType: any;
  downloadImage?: any;
  legend?: boolean;
  children?: React.ReactNode;
};

const Chart = ({
  id,
  data,
  info,
  share,
  chartType,
  downloadImage,
  children,
}: ChartProps) => {
  const [activeDatasets, setActiveDatasets] = useState<Dataset[]>(
    chartType.datasets
  );

  const [chartView, setChartView] = useState(chartType?.chartViewTypes?.[0]);
  const [legendView, setLegendView] = useState({
    [chartType.lineDataKey!]: true,
    [chartType.barDataKey!]: true,
  });

  const toggleDataset = (key: string) => {
    setActiveDatasets((currentDatasets) =>
      currentDatasets.map((dataset) =>
        dataset.key === key
          ? { ...dataset, isActive: true }
          : { ...dataset, isActive: false }
      )
    );
  };

  const renderChart = (config: ChartTypeConfig) => {
    if (children) {
      return children;
    }

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
      case "area-single":
        return (
          <AreaLineChart
            chartView={chartView}
            data={data}
            lineDataKey={config.lineDataKey!}
            lineStroke={config.lineStroke!}
          />
        );
      case "area-multiple":
        return <AreaLineChartMultiple datasets={activeDatasets} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.chart}>
      <div className={styles.topSide}>
        {chartType.chartViewTypes && (
          <div className="chartView">
            {chartType?.chartViewTypes.map((type: string) => (
              <button
                key={type}
                onClick={() => setChartView(type)}
                className={chartView === type ? styles.active : styles.inactive}
              >
                {type}
              </button>
            ))}
          </div>
        )}
        <div className={styles.datasetSelector}>
          {activeDatasets?.map((dataset) => (
            <button
              key={dataset.key}
              onClick={() => toggleDataset(dataset.key)}
              className={dataset.isActive ? styles.active : styles.inactive}
            >
              {dataset.key}
            </button>
          ))}
        </div>
        {info && (
          <div className={styles.info}>
            <h3>{info.title}</h3>
            <Hoverable content={info.desc}>
              <Question />
            </Hoverable>
          </div>
        )}
        {legendView[0] === true ? (
          <ChartLegend
            chartType={chartType}
            legendView={legendView}
            setLegendView={setLegendView}
          />
        ) : null}
        <a
          className="ml-auto download opacity-0 transition-all transition-300ms absolute right-20 z-200"
          href={downloadImage}
          download={`${id}`}
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
