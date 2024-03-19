import { formatToE } from "@/utils/format";
import { cpSync } from "fs";
import { useTheme } from "next-themes";
import React from "react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const halvingDates = [1354060800, 1467936000, 1589155200, 1714262400];

const StockToFlow = ({ data }: any) => {
  const { resolvedTheme } = useTheme();

  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill={resolvedTheme === "light" ? "#000" : "#fff"}
          transform="rotate(-35)"
          strokeDasharray="10 10"
        >
          {new Date(payload.value * 1000).getFullYear()}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    console.log(payload[0]?.dataKey);
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {payload[0]?.dataKey === "o.price" ? (
            <p className="label">{`${new Date(
              label * 1000
            ).toLocaleDateString()}: ${formatToE(payload[0].value)} USD`}</p>
          ) : null}
          <p>
            Stock-to-flow Ratio [USD]:{" "}
            {payload[payload[0]?.dataKey === "o.price" ? 1 : 0]?.value?.toFixed(
              2
            )}
          </p>
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <XAxis
          interval={500}
          dataKey="t"
          tickFormatter={(unixTime) => {
            const date = new Date(unixTime * 1000);
            const year = date.getFullYear();
            return year.toString();
          }}
          tickCount={1}
          tick={<CustomizedAxisTick />}
        />
        <YAxis scale="log" domain={["auto", "auto"]} />
        <Line
          animationDuration={1000}
          type="monotone"
          dataKey="o.price"
          stroke="transparent"
          dot={({ payload, cx, cy }) => {
            if (!payload.o.price) return <></>;
            const color = getColor(payload.o.daysTillHalving);
            return (
              <svg>
                <circle cx={cx - 1} cy={cy - 1} r={2} fill={color} />
              </svg>
            );
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          position={{
            x: 0,
            y: -70,
          }}
        />
        <Line
          animationDuration={1000}
          type="monotone"
          dataKey="o.ratio"
          stroke="#FFC403"
          dot={false}
          strokeWidth={2}
        />
        {halvingDates.map((ts, i) => (
          <ReferenceLine
            key={`${ts}-${i}`}
            x={ts}
            stroke="#777777"
            strokeDasharray="3 3"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockToFlow;

function getColor(num: number) {
  const normalizedNum = num / 1400;

  const colors = [
    { color: [128, 0, 128], range: [0, 0.143] },
    { color: [0, 0, 255], range: [0.143, 0.286] },
    { color: [0, 255, 255], range: [0.286, 0.429] },
    { color: [0, 255, 0], range: [0.429, 0.572] },
    { color: [255, 255, 0], range: [0.572, 0.715] },
    { color: [255, 165, 0], range: [0.715, 0.858] },
    { color: [255, 0, 0], range: [0.858, 1] },
  ];

  for (let i = 0; i < colors.length; i++) {
    if (
      normalizedNum >= colors[i].range[0] &&
      normalizedNum <= colors[i].range[1]
    ) {
      const rangeSize = colors[i].range[1] - colors[i].range[0];
      const positionInRange = (normalizedNum - colors[i].range[0]) / rangeSize;

      if (i < colors.length - 1) {
        const nextColor = colors[i + 1].color;
        const color = colors[i].color.map((c, index) =>
          Math.round(
            c * (1 - positionInRange) + nextColor[index] * positionInRange
          )
        );
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      }

      const color = colors[i].color;
      return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }
  }
}
