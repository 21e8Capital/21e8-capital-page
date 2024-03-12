import Chart from "./Chart";
import styles from "./styles.module.scss";

interface ChartWrapperProps {
  id?: string;
  data: any[];
  header: string;
  subheader?: string;
  info?: { title: string; desc: string };
  share?: {
    title: string;
    url: string;
  };
  chartType: ChartTypeConfig;
  downloadImage?: any;
}

const ChartWrapper = ({
  id,
  data,
  info,
  share,
  header,
  subheader,
  chartType,
  downloadImage,
}: ChartWrapperProps) => (
  <div className={styles.chartWrapper}>
    <h2>{header}</h2>
    {subheader ?? <p>{subheader}</p>}
    <div id={id} className={styles.chartId}>
      <Chart
        id={id}
        info={info}
        data={data}
        share={share}
        chartType={chartType}
        downloadImage={downloadImage}
      />
    </div>
  </div>
);

export default ChartWrapper;
