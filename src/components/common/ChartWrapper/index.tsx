import { useTheme } from "next-themes";
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
  graphics?: boolean;
}

const ChartWrapper = ({
  id,
  data,
  info,
  share,
  header,
  graphics,
  subheader,
  chartType,
  downloadImage,
}: ChartWrapperProps) => {
  const { theme } = useTheme();

  const gradients = [
    {
      className: styles.gradient0,
      src: `/images/${
        theme === "light" ? "circle-gradient-small" : "radial-gradient-0"
      }.webp`,
    },
    {
      className: styles.gradient1,
      src: `/images/${
        theme === "light" ? "circle-gradient-small" : "radial-gradient-2"
      }.webp`,
    },
  ];

  return (
    <div className={styles.chartWrapper}>
      <h2>{header}</h2>
      {subheader ?? <p>{subheader}</p>}
      <div className={styles.chartId}>
        <Chart
          id={id}
          info={info}
          data={data}
          share={share}
          chartType={chartType}
          downloadImage={downloadImage}
        />
        {graphics && (
          <>
            {gradients.map((grad, i) => (
              <img
                key={i}
                className={`${grad.className} absolute`}
                src={grad.src}
                alt="Radial Gradient"
              />
            ))}
            <img
              className={`${styles.dots} absolute`}
              src="/images/dots.png"
              alt="Stars"
            />
            <img
              className={`${styles.ball} absolute`}
              src="/images/ball.png"
              alt="Circles"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChartWrapper;