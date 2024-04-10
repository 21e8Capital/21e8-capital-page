import { useState } from "react";
import { useTheme } from "next-themes";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import ShareButton from "@/components/common/ShareButton";
import { formatToE } from "@/utils/format";

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
}

let initializedData = [
  {
    name: "Jan",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Feb",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Mar",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Apr",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "May",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Jun",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Jul",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Aug",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Sep",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Oct",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Nov",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
  {
    name: "Dec",
    btc: 0,
    layer1: 0,
    defi: 0,
    other: 0,
  },
];

export const FundPerformance = ({ btcHistory, layer1History }: Props) => {
  const { resolvedTheme } = useTheme();
  const [legendView, setLegendView] = useState({
    bitconDataKey: true,
    layer1DataKey: true,
    deFiDataKey: true,
    otherDataKey: true,
  });

  const index =
    layer1History[layer1History?.length - 1].time.index >
    btcHistory[btcHistory?.length - 1].time.index
      ? layer1History[layer1History?.length - 1].time.index
      : btcHistory[btcHistory.length - 1].time.index;

  let data = initializedData.slice(0, index + 2);

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
        layer1: sum,
      };
    } else {
      // If no matching items, return the original item
      return item;
    }
  });

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
        btc: sum,
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

  const share = {
    url: `${window.location.href}#etf-tracker`,
    title: "21e8.Capital - Bitcoin Etf Tracker",
  };

  return (
    <section className="mt-[88px] mb-[172px] p-5 md:py-10 md:px-[30px] w-full border-[2px] border-solid border-[#FCDFA6] border-opacity-[0.15] rounded-[10px] bg-[#141414]">
      <h2 className="text-[20px]">Fund Performance</h2>
      <div className="py-4 flex items-center justify-between relative">
        <ul className="flex gap-2 md:gap-x-5 max-md:flex-wrap">
          <li
            onClick={() =>
              setLegendView({
                ...legendView,
                bitconDataKey: !legendView["bitconDataKey"],
              })
            }
            className={`px-3.5 w-[100px] cursor-pointer text-left font-bold py-[7px] bg-[#FFC403] text-black rounded-full text-sm ${
              legendView.bitconDataKey
                ? "bg-[#FFC403]"
                : "bg-[#FFC403] opacity-55"
            }`}
          >
            Bitcoin
          </li>
          <li
            onClick={() =>
              setLegendView({
                ...legendView,
                layer1DataKey: !legendView["layer1DataKey"],
              })
            }
            className={`px-3.5 w-[100px] cursor-pointer text-left font-bold py-[7px] bg-[#FFC403] text-black rounded-full text-sm ${
              legendView.layer1DataKey
                ? "bg-[#FFC403]"
                : "bg-[#FFC403] opacity-55"
            }`}
          >
            Layer1
          </li>
          <li
            onClick={() =>
              setLegendView({
                ...legendView,
                deFiDataKey: !legendView["deFiDataKey"],
              })
            }
            className={`px-3.5 w-[100px] cursor-pointer text-left font-bold py-[7px] bg-[#FFC403] text-black rounded-full text-sm ${
              legendView.deFiDataKey
                ? "bg-[#FFC403]"
                : "bg-[#FFC403] opacity-55"
            }`}
          >
            DeFi
          </li>
          <li
            onClick={() =>
              setLegendView({
                ...legendView,
                otherDataKey: !legendView["otherDataKey"],
              })
            }
            className={`px-3.5 w-[100px] cursor-pointer text-left font-bold py-[7px] bg-[#FFC403] text-black rounded-full text-sm ${
              legendView.otherDataKey
                ? "bg-[#FFC403]"
                : "bg-[#FFC403] opacity-55"
            }`}
          >
            Other
          </li>
        </ul>
        <div className="absolute right-8">
          <ShareButton url={share.url} title={share.title} />
        </div>
      </div>
      <ul className="flex max-md:flex-wrap text-sm mb-6 gap-4 md:gap-x-[22px]">
        <li className="flex items-center gap-x-0.5">
          <span className="w-3 h-3 bg-[#FFC403] rounded-full"></span>
          Bitcoin
        </li>
        <li className="flex items-center gap-x-0.5">
          <span className="w-3 h-3 bg-[#17CACC] rounded-full"></span>
          Layer1
        </li>
        <li className="flex items-center gap-x-0.5">
          <span className="w-3 h-3 bg-[#40E782] rounded-full"></span>
          DeFi
        </li>
        <li className="flex items-center gap-x-0.5">
          <span className="w-3 h-3 bg-[#EE6565] rounded-full"></span>
          Other
        </li>
      </ul>
      <ResponsiveContainer width="100%" height={500} id="fund-assets">
        <AreaChart
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
          <Tooltip content={<CustomTooltip />} />
          {legendView.bitconDataKey && (
            <Area
              type="monotone"
              dataKey="btc"
              stroke="#FFC403"
              fill="#FFC403"
            />
          )}
          {legendView.layer1DataKey && (
            <Area
              type="monotone"
              dataKey="layer1"
              stroke="#17CACC"
              fill="#17CACC"
            />
          )}
          {/* {legendView.deFiDataKey && (
            <Area
              type="monotone"
              dataKey="defi"
              stroke="#40E782"
              fill="#40E782"
            />
          )}
          {legendView.otherDataKey && (
            <Area
              type="monotone"
              dataKey="other"
              stroke="#EE6565"
              fill="#EE6565"
            />
          )} */}
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <>
        {payload.map((item: any, idx: number) => (
          <div key={idx} className="custom-tooltip">
            <p className="label">{`${item.name} : ${formatToE(
              item.value.toFixed(2)
            )} USD`}</p>
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
