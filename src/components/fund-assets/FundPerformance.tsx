import { useState } from "react";
import { useTheme } from "next-themes";

import {
  BarChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
} from "recharts";

import { formatToE } from "@/utils/format";
import { Legend } from "./Legend";
import { findBiggest } from "@/utils/api/fund-assets";
import { color } from "html2canvas/dist/types/css/types/color";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";

interface Props {
  btcHistory: {
    time: {
      month: string;
      index: number;
    };
    value: number;
  }[];
  layer1History: {
    time: {
      month: string;
      index: number;
    };
    value: number;
  }[];
  deFiHistory: {
    time: {
      month: string;
      index: number;
    };
    value: number;
  }[];
  otherHistory: {
    time: {
      month: string;
      index: number;
    };
    value: number;
  }[];
}
type myPosition = {
  data: any,
  show: Boolean
}
let initializedData = [
  {
    name: "Jan",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Feb",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Mar",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Apr",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "May",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Jun",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Jul",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Aug",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Sep",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Oct",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Nov",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
  {
    name: "Dec",
    BTC: 0,
    Layer1: 0,
    DeFi: 0,
    Others: 0
  },
];
export const FundPerformance = ({
  btcHistory,
  layer1History,
  deFiHistory,
  otherHistory
}: Props) => {
  const { resolvedTheme } = useTheme();
  const [legendView, setLegendView] = useState({
    bitconDataKey: true,
    layer1DataKey: true,
    deFiDataKey: true,
    othersDataKey: true,
  });
  const [position, setPosition] = useState<myPosition>();
  const handleLegend = (legend: any) => setLegendView(legend);
  const isSmallScreen = window.innerWidth < 600;
  const numOfMonths = findBiggest([
    btcHistory[btcHistory?.length - 1].time.index,
    layer1History[layer1History?.length - 1].time.index,
  ]);

  let data = initializedData.slice(0, numOfMonths);
  // Layer1
  data = data.map((item) => {
    const matchingSecondItems = layer1History?.filter(
      (secondItem) => secondItem.time.month === item.name
    );
    if (matchingSecondItems && matchingSecondItems?.length > 0) {
      // If there are matching items, sum up the values
      const sum = matchingSecondItems?.reduce(
        (total, current) => total + current.value,
        0
      );

      // Update the layer1 property
      return {
        ...item,
        Layer1: sum,
      };
    } else {
      // If no matching items, return the original item
      return item;
    }
  });
  // DeFi
  data = data.map((item) => {
    const matchingSecondItems = deFiHistory?.filter(
      (secondItem) => secondItem.time.month === item.name
    );
    if (matchingSecondItems && matchingSecondItems?.length > 0) {
      // If there are matching items, sum up the values
      const sum = matchingSecondItems?.reduce(
        (total, current) => total + current.value,
        0
      );

      // Update the layer1 property
      return {
        ...item,
        DeFi: sum,
      };
    } else {
      // If no matching items, return the original item
      return item;
    }
  });
  // Others
  data = data.map((item) => {
    const matchingSecondItems = otherHistory?.filter(
      (secondItem) => secondItem.time.month === item.name
    );
    if (matchingSecondItems && matchingSecondItems?.length > 0) {
      // If there are matching items, sum up the values
      const sum = matchingSecondItems?.reduce(
        (total, current) => total + current.value,
        0
      );
      return {
        ...item,
        Others: sum,
      };
    } else {
      // If no matching items, return the original item
      return item;
    }
  });
  // BTC
  data = data.map((item) => {
    const matchingSecondItems = btcHistory?.filter(
      (secondItem) => secondItem.time.month === item.name
    );
    if (matchingSecondItems && matchingSecondItems?.length > 0) {
      // If there are matching items, sum up the values
      const sum = matchingSecondItems?.reduce(
        (total, current) => total + current.value,
        0
      );

      // Update the btc property
      return {
        ...item,
        BTC: sum,
      };
    } else {
      // If no matching items, return the original item
      return item;
    }
  });
  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const year = payload.value;

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
    <section
      className={`max-w-[1440px] mx-auto mt-[88px] p-5 md:py-10 md:px-[30px] shadow-lg w-full border-[2px] border-solid border-[#FCDFA6] border-opacity-[0.15] rounded-[10px] ${resolvedTheme === "light" ? "bg-[#fff]" : "bg-[#141414]"
        }`}
    >
      <h4
        className={`text-[24px] ${resolvedTheme === "light" ? "text-black" : "text-white"
          }`}
      >
        Fund Performance
      </h4>
      <Legend legendView={legendView} handleLegend={handleLegend} />
      <ResponsiveContainer width="100%" height={500} id="fund-assets" >
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 20,
            bottom: 20,
          }}
        >

          <CartesianGrid vertical={false} strokeOpacity={0.3} />
          <XAxis dataKey="name" stroke="#fff" tick={CustomizedAxisTick} />
          <YAxis />
          <Tooltip position={{
            // Static position
            x: isSmallScreen ? 80 : position?.data.x ?? 0,
            y: 0,
          }} content={<CustomTooltip />} wrapperStyle={{ backgroundColor: resolvedTheme === "light" ? "#ebebeb" : "#3b3b3b", padding: '10px', borderRadius: '10px' }} cursor={false} />
          {legendView.bitconDataKey && (
            <Bar
              stackId={1}
              dataKey="BTC"
              stroke="#FFC403"
              fill="#FFC403"
              onMouseMove={data => setPosition({ data: data, show: true })}
              onMouseOut={data => setPosition({ data: data, show: false })}
            />
          )}
          {legendView.layer1DataKey && (
            <Bar
              dataKey="Layer1"
              stackId={1}
              stroke="#17CACC"
              fill="#17CACC"
              onMouseMove={data => setPosition({ data: data, show: true })}
              onMouseOut={data => setPosition({ data: data, show: false })}
            />
          )}
          {legendView.deFiDataKey && (
            <Bar
              dataKey="DeFi"
              stackId={1}
              stroke="#40E782"
              fill="#40E782"
              onMouseMove={data => setPosition({ data: data, show: true })}
              onMouseOut={data => setPosition({ data: data, show: false })}
            />
          )}
          {legendView.othersDataKey && (
            <Bar
              dataKey="Others"
              stackId={1}
              stroke="#EE6565"
              fill="#EE6565"
              onMouseMove={data => setPosition({ data: data, show: true })}
              onMouseOut={data => setPosition({ data: data, show: false })}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </section >
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <>
        {payload.map((item: any, idx: number) => (
          <div key={idx} className="custom-tooltip" >
            <p className="label">{`${item.name} : ${formatToE(
              item.value.toFixed(2)
            )} AUD`}</p>
            <div
              className="vertical-line"
              style={{
                height: "100%",
                width: 1,
                position: "absolute",
                left: item.payload.cx,
                top: 0,
                borderStyle: "dashed",
              }}
            />
          </div>
        ))}
      </>
    );
  }

  return null;
};
