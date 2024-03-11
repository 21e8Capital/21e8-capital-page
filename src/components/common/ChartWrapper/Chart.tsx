import { LineChart, LineBarChart } from "./custom";
import Hoverable from "../Hoverable";
import { Logo, Question } from "@/svg";
import styles from "./styles.module.scss";
import ShareButton from "../ShareButton";

type ChartProps = {
  id?: string;
  data: any[];
  info?: { title: string; desc: string };
  share?: {
    title: string;
    url: string;
  };
  chartType: ChartTypeConfig;
};

const Chart = ({ data, info, share, chartType }: ChartProps) => {
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
        {/* {share?.url && <ShareButton />} */}
      </div>
      {renderChart(chartType)}
      <div className={styles.radialGradient}></div>
      <Logo className={styles.logo} />
    </div>
  );
};

export default Chart;
