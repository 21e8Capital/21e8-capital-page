import { GetStaticProps } from "next";

import { AssetList } from "@/components/fund-assets/AssetList";
import { FundAssetDistribution } from "@/components/fund-assets/FundAssetDistribution";
import {
  fetchBitcoinData,
  formatCurrency,
  fetchEthereumData,
  fetchSolanaData,
  fetchThorchainData,
} from "@/utils/api";

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
  console.log(layer1);

  return (
    <div className="fund-assets-page">
      <h1>Fund Assets</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-[69px] w-full pt-[160px]">
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
    </div>
  );
};

export default FundAssets;

export const getStaticProps: GetStaticProps = async () => {
  const btc = await fetchBitcoinData();
  const layer1 = await fetchEthereumData();
  //   const defi = await fetchThorchainData();
  //   const other = await fetchSolanaData();

  return {
    props: {
      btc,
      layer1,
      //   defi,
      //   other,
    },
    revalidate: 43200,
  };
};
