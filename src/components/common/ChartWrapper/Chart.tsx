import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./styles.module.scss";
import Hoverable from "../Hoverable";
import { Logo, Question, Share } from "@/svg";

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const dateParts = payload.value.split(" ");
  const year = dateParts[1];

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        strokeDasharray="10 10"
      >
        {year}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <div
          className="vertical-line"
          style={{
            height: "100%",
            width: 1,
            position: "absolute",
            left: payload[0].payload.cx,
            top: 0,
            borderStyle: "dashed",
          }}
        />
      </div>
    );
  }

  return null;
};

const Chart = ({ data, info, share }: any) => {
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
        {share && (
          <div className={styles.share}>
            <Share />
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            left: -25,
          }}
        >
          <CartesianGrid horizontal={true} vertical={false} />
          <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
          <YAxis strokeOpacity={0} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="data" stroke="#FFC403" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.radialGradient}></div>
      <Logo className={styles.logo} />
    </div>
  );
};

export default Chart;
