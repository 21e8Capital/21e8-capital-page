import { GetStaticProps } from "next";
import { useState } from "react";

import { AssetList } from "@/components/fund-assets/AssetList";
import { FundAssetDistribution } from "@/components/fund-assets/FundAssetDistribution";
import {
  fetchBitcoinData,
  formatCurrency,
  fetchEthereumData,
  fetchSolanaData,
  fetchThorchainData,
} from "@/utils/api";
import { FundPerformance } from "@/components/fund-assets/FundPerformance";
import { cryptoCompareApiMining } from "../utils/axios";
import { fetchChainFlipData, fetchDefiData, fetchL1Data, fetchOtherData } from "@/utils/api/fund-assets";

interface Props {
  btc: {
    balance: number;
    value: number;
    price: number;
    history: {
      time: {
        month: string;
        index: number;
      };
      value: number;
    }[];
  };
  layer1: {
    balance: number;
    value: number;
    price: number;
    history: {
      time: {
        month: string;
        index: number;
      };
      value: number;
    }[];
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
    history: {
      time: {
        month: string;
        index: number;
      };
      value: number;
    }[];
  };
}

const FundAssets = ({ btc, layer1, defi, other }: Props) => {
  const [imagesToDownload, setImagesToDownload] = useState<
    { [key: string]: string }[]
  >([]);

  // useEffect(() => {
  //   const handleImageSaving = async () => {
  //     const imageIds = ["fund-assets"];

  //     const images = await captureScreenshots(imageIds, "/api/saveImages");

  //     console.log(images)

  //     setImagesToDownload(
  //       // @ts-ignore
  //       images.reduce(
  //         (acc, { fileName, image }) => ({
  //           ...acc,
  //           [fileName]: image,
  //         }),
  //         {}
  //       )
  //     );
  //   };

  //   const imageSavingTimeout = setTimeout(() => {
  //     handleImageSaving();
  //   }, 2000);

  //   return () => {
  //     clearTimeout(imageSavingTimeout);
  //   };
  // }, []);

  return (
    <div className="fund-assets-page">
      <h2>Fund Assets</h2>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-[40px] xl:gap-x-[69px] w-full pt-10 lg:pt-[160px] max-lg:gap-y-10 max-w-[1440px] mx-auto">
        <AssetList
          btcPrice={formatCurrency(btc?.value)}
          layer1Price={formatCurrency(layer1?.value + other?.value)}
          defiPrice={formatCurrency(defi?.value)}
          totalBalance={formatCurrency(
            layer1?.value + other?.value + defi.value + btc?.value
          )}
          otherPrice={formatCurrency(other?.value)}
        />
        <FundAssetDistribution
          btc={btc?.value}
          layer1={layer1?.value}
          defi={defi?.value}
          other={other?.value}
        />
      </section>
      <FundPerformance
        btcHistory={btc?.history}
        layer1History={layer1?.history}
        otherHistory={other?.history}
      />
    </div>
  );
};

export default FundAssets;

export const getStaticProps: GetStaticProps = async () => {
  const data = (await cryptoCompareApiMining.get(
    "/data/pricemulti?fsyms=BTC,SOL,RUNE,ETH,FLIP,USDC&tsyms=AUD"
  )) as any;

  // console.log(data)
  const btc = await fetchBitcoinData(data.data.BTC.AUD);
  const layer1 = await fetchL1Data(data.data.ETH.AUD, data.data.SOL.AUD);
  const defi = await fetchDefiData(data.data.RUNE.AUD, data.data.FLIP.AUD);
  const other = await fetchOtherData(data.data.USDC.AUD);

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
