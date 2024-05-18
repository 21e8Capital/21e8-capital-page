import ShareButton from "@/components/common/ShareButton";

export const Legend = ({ legendView, handleLegend }: any) => {
  const share = {
    url: `${window.location.href}#etf-tracker`,
    title: "21e8.Capital - Bitcoin Etf Tracker",
  };
  return (
    <>
      {" "}
      <div className="py-4 flex items-center justify-between relative">
        <ul className="flex gap-2 md:gap-x-5 max-md:flex-wrap">
          <li
            onClick={() =>
              handleLegend({
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
              handleLegend({
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
      </ul>
    </>
  );
};
