import { useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  LabelProps,
  BarProps,
  Legend,
} from "recharts";
import styles from "../styles.module.scss";
import { useTheme } from "next-themes";

type LineBarChartProps = {
  id?: string;
  data: any[];
  lineDataKey: string;
  barDataKey: string;
  lineStroke: string;
  barFill: string;
};

const LineBarChartComponent = ({
  id,
  data,
  lineDataKey,
  barDataKey,
  lineStroke,
  barFill,
}: LineBarChartProps) => {
  const { resolvedTheme } = useTheme();
  const [activeKeys, setActiveKeys] = useState({
    [lineDataKey]: true,
    [barDataKey]: true,
  });

  const handleLegendClick = (key: string) => {
    setActiveKeys((prevActiveKeys) => ({
      ...prevActiveKeys,
      [key]: !prevActiveKeys[key],
    }));
  };

  const renderLegend = () => {
    return (
      <div className="custom-legend">
        {Object.entries(activeKeys).map(([key, active]) => (
          <div
            key={key}
            onClick={() => handleLegendClick(key)}
            style={{ textDecoration: active ? "none" : "line-through" }}
          >
            {key}
          </div>
        ))}
      </div>
    );
  };

  const CustomLineLabel = ({ x, y, value }: LabelProps) => (
    <text
      x={x}
      y={y}
      dy={-10}
      fill={resolvedTheme === "light" ? "#000" : "#fff"}
      fontSize={14}
      textAnchor="middle"
    >
      {formatToK(Number(value))}
    </text>
  );

  const CustomBarLabel = ({ index, value, x, y, width }: LabelProps) => {
    if (index === 0) {
      return null;
    }

    return (
      <text
        x={Number(x) + Number(width) / 2}
        y={Number(y) - 20}
        fill={resolvedTheme === "light" ? "#000" : "#fff"}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={14}
      >
        {formatToK(Number(value))}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="key" tickMargin={15} />
        <YAxis
          strokeOpacity={0}
          domain={[0, "dataMax"]}
          tickFormatter={formatToK}
          tickLine={false}
        />
        {activeKeys[barDataKey] && (
          <Bar
            dataKey={barDataKey}
            fill={barFill}
            barSize={20}
            animationDuration={1000}
          >
            <LabelList content={CustomBarLabel} />
          </Bar>
        )}
        {activeKeys[lineDataKey] && (
          <Line
            type="monotone"
            dataKey={lineDataKey}
            stroke={resolvedTheme === "dark" ? lineStroke : "#232121"}
            label={CustomLineLabel}
            animationDuration={1000}
          />
        )}
        {renderLegend()}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const formatToK = (num: number) => {
  return Math.abs(num) >= 1000 ? `${(num / 1000).toFixed(2)}K` : `${num}`;
};

export default LineBarChartComponent;
