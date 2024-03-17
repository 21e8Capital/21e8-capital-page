// LineChartComponent.tsx
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LineChartProps = {
  id?: string;
  data: any[];
  dataKey: string;
  stroke: string;
};

const LineChart = ({ id, data, dataKey, stroke }: LineChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <RechartsLineChart
      data={data}
      margin={{
        left: -25,
        bottom: 12,
      }}
    >
      <CartesianGrid vertical={false} strokeOpacity={0.3} />
      <XAxis dataKey="key" tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={stroke}
        dot={false}
        animationDuration={1000}
        strokeWidth={2}
      />
    </RechartsLineChart>
  </ResponsiveContainer>
);

export default LineChart;

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
        fill="#fff"
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
        <p className="label">{`${label}: ${payload[0].value}`}</p>
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
