import { useTheme } from "next-themes";
import Chart from "./Chart";
import styles from "./styles.module.scss";
import ShareButton from "../ShareButton";
import { useState } from "react";

interface ChartWrapperProps {
  id?: string;
  bg?: boolean;
  data?: any[];
  header?: string;
  subheader?: string;
  info?: { title: string; desc: string };
  share?: {
    title: string;
    url: string;
  };
  chartType: ChartTypeConfig;
  downloadImage?: any;
  graphics?: boolean;
  legend?: boolean;
  children?: React.ReactNode;
}

const ChartWrapper = ({
  id,
  bg,
  data,
  info,
  share,
  header,
  legend,
  graphics,
  subheader,
  chartType,
  downloadImage,
  children,
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
    <div className={`${styles.chartWrapper} ${bg && styles.bg}`}>
      {header ? <h2 className="text-center">{header}</h2> : null}
      {subheader ? <p className="text-center">{subheader}</p> : null}
      <div className={styles.chartId}>
        <Chart
          id={id}
          info={info}
          data={data}
          share={share}
          legend={legend}
          chartType={chartType}
          downloadImage={downloadImage}
        >
          {children}
        </Chart>
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
