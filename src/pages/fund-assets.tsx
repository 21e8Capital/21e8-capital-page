import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

import { AssetList } from "@/components/fund-assets/AssetList";
import { FundAssetDistribution } from "@/components/fund-assets/FundAssetDistribution";
import {
  fetchBitcoinData,
  formatCurrency,
  fetchEthereumData,
  fetchSolanaData,
  fetchThorchainData,
} from "@/utils/api";
import captureScreenshots from "@/utils/captureDom";
import { FundPerformance } from "@/components/fund-assets/FundPerformance";

interface Props {
  btc: {
    balance: number;
    value: number;
    price: number;
  };
  layer1: {
    balance: number;
    value: number;
    price: number;
  };
  defi: {
    balance: number;
    value: number;
    price: number;
  };
  other: {
    balance: number;
    value: number;
    price: number;
  };
}

const FundAssets = ({ btc, other, layer1, defi }: Props) => {
  const [imagesToDownload, setImagesToDownload] = useState<
    { [key: string]: string }[]
  >([]);

  useEffect(() => {
    const handleImageSaving = async () => {
      const imageIds = ["fund-assets"];

      const images = await captureScreenshots(imageIds, "/api/saveImages");

      setImagesToDownload(
        // @ts-ignore
        images.reduce(
          (acc, { fileName, image }) => ({
            ...acc,
            [fileName]: image,
          }),
          {}
        )
      );
    };

    const imageSavingTimeout = setTimeout(() => {
      handleImageSaving();
    }, 2000);

    return () => {
      clearTimeout(imageSavingTimeout);
    };
  }, []);

  return (
    <div className="fund-assets-page container">
      <h1>Fund Assets</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-[40px] xl:gap-x-[69px] w-full pt-[160px] max-md:gap-y-10">
        <AssetList
          btcPrice={formatCurrency(btc?.value)}
          layer1Price={formatCurrency(layer1?.value)}
          defiPrice={formatCurrency(defi?.value)}
          otherPrice={formatCurrency(other?.value)}
        />
        <FundAssetDistribution
          btc={btc?.balance}
          layer1={layer1?.balance}
          defi={defi?.balance}
          other={other?.balance}
        />
      </section>
      <FundPerformance />
    </div>
  );
};

export default FundAssets;

export const getStaticProps: GetStaticProps = async () => {
  const btc = await fetchBitcoinData();
  const layer1 = await fetchEthereumData();
  const defi = await fetchThorchainData();
  const other = await fetchSolanaData();

  return {
    props: {
      btc,
      layer1,
      defi,
      other,
    },
    revalidate: 43200,
  };
};

// btc = {
//   balance: 26.8747625,
//   price: 108877,
//   value: 2926043.5167125,
// },
// layer1 = { balance: 194.7864, price: 5589.59, value: 1088776.1135759999 },
// defi = { balance: 90488.82, price: 11.63, value: 1052384.9766000002 },
// other = {
//   balance: 90488.82,
//   price: 11.63,
//   value: 1052384.9766000002,
// },
