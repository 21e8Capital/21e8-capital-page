import { GetStaticProps } from "next";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { AssetList } from "@/components/fund-assets/AssetList";
import { FundAssetDistribution } from "@/components/fund-assets/FundAssetDistribution";
import {
  fetchBitcoinData,
  formatCurrency,
  fetchEthereumData,
  fetchSolanaData,
  fetchThorchainData,
} from "@/utils/api";
import ShareButton from "@/components/common/ShareButton";

interface Props {
  btc: {
    balance: string;
    value: string;
    price: number;
  };
  layer1: any;
  defi: any;
  other: any;
}

const FundAssets = ({ btc, layer1, defi, other }: Props) => {
  const [legendView, setLegendView] = useState({
    bitconDataKey: true,
    layer1DataKey: true,
    deFiDataKey: true,
    otherDataKey: true,
  });

  const data = [
    {
      name: "Jan",
      uv: 2000,
      pv: 2400,
      amt: 2600,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 3198,
      amt: 3210,
    },
    {
      name: "Mar",
      uv: 3000,
      pv: 3500,
      amt: 3790,
    },
    {
      name: "Apr",
      uv: 3980,
      pv: 4208,
      amt: 4400,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];

  const share = {
    url: `${window.location.href}#etf-tracker`,
    title: "21e8.Capital - Bitcoin Etf Tracker",
  };

  return (
    <div className="container">
      <h1>Fund Assets</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-[40px] xl:gap-x-[69px] w-full pt-[160px] max-md:gap-y-10">
        <AssetList
          btcPrice={formatCurrency(btc?.price)}
          layer1Price={formatCurrency(23342234)}
          defiPrice={formatCurrency(234334)}
          otherPrice={formatCurrency(24232344)}
        />
        <FundAssetDistribution
          btc={btc.price}
          defi={103400}
          layer1={103240}
          other={13400}
        />
      </section>
      <section className="mt-[88px] mb-[172px] p-5 md:py-10 md:px-[30px] w-full border border-[rgba(252, 223, 166, 0.15)] rounded-[10px] bg-[#141414]">
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
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis />
            <Tooltip />
            {legendView.bitconDataKey && (
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#FFC403"
                fill="#FFC403"
              />
            )}
            {legendView.layer1DataKey && (
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#17CACC"
                fill="#17CACC"
              />
            )}
            {legendView.deFiDataKey && (
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#40E782"
                fill="#40E782"
              />
            )}

            {legendView.otherDataKey && (
              <Area
                type="monotone"
                dataKey="amt"
                stackId="1"
                stroke="#EE6565"
                fill="#EE6565"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default FundAssets;

export const getStaticProps: GetStaticProps = async () => {
  const btc = await fetchBitcoinData();
  //   const layer1 = await fetchEthereumData();
  //   const defi = await fetchThorchainData();
  //   const other = await fetchSolanaData();

  return {
    props: {
      btc,
      //   layer1,
      //   defi,
      //   other,
    },
    revalidate: 43200,
  };
};
