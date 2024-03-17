import React from "react";
import styles from "./styles.module.scss";

interface LegendViewConfig {
  [key: string]: boolean;
}

interface ChartTypeConfig {
  type: string;
  dataKey?: string;
  lineDataKey?: string;
  barDataKey?: string;
  lineStroke?: string;
  barFill?: string;
  lineLabel?: string;
  barLabel?: string;
}

interface ChartLegendProps {
  legendView: LegendViewConfig;
  setLegendView: React.Dispatch<React.SetStateAction<LegendViewConfig>>;
  chartType: ChartTypeConfig;
}

const ChartLegend = ({
  legendView,
  setLegendView,
  chartType,
}: ChartLegendProps) => {
  return (
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
  );
};

export default ChartLegend;
