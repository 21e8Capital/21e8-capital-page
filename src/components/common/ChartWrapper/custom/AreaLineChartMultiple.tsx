import { formatToE } from "@/utils/format";
import { useTheme } from "next-themes";
import React from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

type AreaLineChartMultipleProps = {
  datasets: Dataset[];
};

const AreaLineChartMultiple = ({ datasets }: AreaLineChartMultipleProps) => {
  const { resolvedTheme } = useTheme();

  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const dateParts = payload.value.split("-");
    const year = dateParts[2];

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={3}
          dy={16}
          textAnchor="end"
          fill={resolvedTheme === "light" ? "#000" : "#fff"}
          transform="rotate(-35)"
          strokeDasharray="10 10"
        >
          {year}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={datasets.find((ds) => ds.isActive)?.data}
        margin={{
          top: 15,
          bottom: 15,
          left: 10,
        }}
      >
        <CartesianGrid vertical={false} strokeOpacity={0.3} />
        <XAxis dataKey="key" tick={<CustomizedAxisTick />} />
        <YAxis
          strokeOpacity={0}
          domain={[0, "dataMax"]}
          tickFormatter={(value) =>
            value > 999 ? formatToE(value) : `${value.toFixed(2)} USD`
          }
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {datasets?.map(
          (dataset, index) =>
            dataset.isActive && (
              <Area
                key={index}
                type="monotone"
                dataKey="price"
                stroke={dataset.stroke}
                fillOpacity={1}
                fill={`url(#colorUv${index})`}
              />
            )
        )}
        {datasets?.map((dataset, index) => (
          <defs key={index}>
            <linearGradient id={`colorUv${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dataset.stroke} stopOpacity={0.8} />
              <stop offset="95%" stopColor={dataset.stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaLineChartMultiple;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${
          payload[0].value > 999
            ? formatToE(payload[0].value)
            : payload[0].value.toFixed(2)
        } USD`}</p>
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
