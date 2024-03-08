import Chart from "./Chart";
import styles from "./styles.module.scss";

interface ChartWrapperProps {
  data: any;
  info?: ChartInfoProps;
  share?: any;
  header: string;
  subheader?: string;
}

const ChartWrapper = ({
  data,
  info,
  share,
  header,
  subheader,
}: ChartWrapperProps) => {
  console.log(data);
  return (
    <div className={styles.chartWrapper}>
      <h2>{header}</h2>
      {subheader ?? <p>{subheader}</p>}
      <Chart info={info} data={data} share={share} />
    </div>
  );
};

export default ChartWrapper;
