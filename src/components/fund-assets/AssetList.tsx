import { useTheme } from "next-themes";

interface Props {
  btcPrice: string;
  layer1Price?: number;
  defiPrice?: number;
  totalBalance: number;
  otherPrice:number
}

export const AssetList = ({
  btcPrice,
  layer1Price,
  defiPrice,
  totalBalance,
  otherPrice
}: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`border-[2px] border-solid border-[#FCDFA6] border-opacity-[0.15] shadow-lg p-5 w-full ${
        resolvedTheme === "light" ? "bg-[#fff]" : "bg-[#141414]"
      }  rounded-[10px] `}
    >
      <h3 className="text-[#FFC403] text-[24px] py-6">Asset List</h3>
      <table className="w-full text-left text-[20px]">
        <thead>
          <tr className="border-b border-[#565656]">
            <th className="py-6 font-[400]">Total balance</th>
            <th className="text-right font-[400]">{totalBalance}</th>
          </tr>
          <tr className="border-b border-[#565656]">
            <th className="py-6 font-[400]">Bitcoin (BTC)</th>
            <th className="text-right font-[400]">{btcPrice}</th>
          </tr>
          <tr className="border-b border-[#565656]">
            <th className="py-6 font-[400]">DeFi (Decentralized Finance)</th>
            <th className="text-right font-[400]">{defiPrice}</th>
          </tr>
          <tr>
            <th className="py-6 font-[400]">Layer 1</th>
            <th className="text-right font-[400]">{layer1Price}</th>
          </tr>
          <tr>
            <th className="py-6 font-[400]">Other</th>
            <th className="text-right font-[400]">{otherPrice}</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};
