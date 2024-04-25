import { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useTheme } from "next-themes";
interface Props {
  btc: number;
  defi: number;
  layer1: number;
  other: number;
}

const RADIAN = Math.PI / 180;

const colors = ["#FFC403", "#EE6565", "#40E782", "#17CACC"];

export const FundAssetDistribution = ({ btc, other, layer1, defi }: Props) => {
  const { resolvedTheme } = useTheme();

  const data = useMemo(
    () => [
      {
        name: "Bitcoin",
        value: btc,
      },
      {
        name: "DeFi",
        value: defi,
      },
      {
        name: "Layer1",
        value: layer1 + other,
      },
    ],
    []
  );

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[14px]"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  const renderCustomizedOuterLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    label,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {data[index].name}
      </text>
    );
  };

  return (
    <div
      className={`border-[2px] border-solid border-[#FCDFA6] border-opacity-[0.15] p-5 w-full shadow-lg rounded-[10px] ${
        resolvedTheme === "light" ? "bg-[#fff]" : "bg-[#141414]"
      } `}
    >
      <h3 className="text-[#FFC403] text-[24px]">Fund Asset Distribution</h3>
      <div className="flex justify-center items-center flex-1">
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            labelLine={false}
            outerRadius={90}
            label={renderCustomizedOuterLabel}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            labelLine={false}
            outerRadius={100}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};
