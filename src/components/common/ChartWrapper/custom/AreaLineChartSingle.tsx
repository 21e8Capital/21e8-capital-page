import { formatToE } from "@/utils/format";
import React from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type AreaLineChartProps = {
  id?: string;
  data: any[];
  lineDataKey: string;
  lineStroke: string;
  legendView?: { [key: string]: boolean };
  chartView?: string;
};

const AreaLineChartSingle = ({ data, chartView }: AreaLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        // @ts-ignore
        data={preprocessDataForChart(data[`${chartView as string}`])}
        margin={{
          top: 15,
          bottom: 15,
          left: 20,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFC403" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFC403" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFC403" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFC403" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis interval={290} dataKey="key" tick={<CustomizedAxisTick />} />
        <YAxis
          strokeOpacity={0}
          domain={[0, "dataMax"]}
          tickFormatter={formatToE}
          tickLine={false}
        />
        <CartesianGrid vertical={false} strokeOpacity={0.3} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey={chartView as string}
          stroke="#FFC403"
          fillOpacity={1}
          fill="url(#colorUv)"
          strokeWidth={2}
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaLineChartSingle;

export const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const dateParts = payload.value.split("-");
  const year = dateParts[2];

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={20}
        y={4}
        dy={16}
        textAnchor="end"
        fill="#fff"
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
        <p className="label">{`${label} : ${formatToE(
          payload[0].value
        )} USD`}</p>
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

const preprocessDataForChart = (data: any[]) => {
  let lastYear = "";
  return data?.map((item) => {
    const year = item.key.split("-")[2];
    if (year !== lastYear) {
      lastYear = year;
      return { ...item, showYear: true };
    }
    return { ...item, showYear: false };
  });
};
