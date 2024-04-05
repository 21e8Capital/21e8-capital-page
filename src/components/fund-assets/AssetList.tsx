import styles from "./assetsList.module.scss";

interface Props {
  btcPrice: string;
  layer1Price?: number;
  defiPrice?: number;
  otherPrice?: number;
}

export const AssetList = ({
  btcPrice,
  layer1Price,
  otherPrice,
  defiPrice,
}: Props) => {
  return (
    <div className="border border-[rgba(252, 223, 166, 0.15)] p-5 w-full bg-[#141414] rounded-[10px]">
      <h3 className="text-[#FFC403] text-[24px] py-6">Asset List</h3>
      <table className="w-full text-left text-[20px]">
        <thead>
          <tr className="border-b border-[#565656]">
            <th className="py-6 font-[400]">Bitcoin (BTC)</th>
            <th className="text-right font-[400]">{btcPrice}</th>
          </tr>
          <tr className="border-b border-[#565656]">
            <th className="py-6 font-[400]">DeFi (Decentralized Finance)</th>
            <th className="text-right font-[400]">{defiPrice}</th>
          </tr>
          <tr className="border-b border-[#565656]">
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
