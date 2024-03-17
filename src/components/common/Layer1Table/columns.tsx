import { createColumnHelper } from "@tanstack/react-table";
import styles from "./styles.module.scss";

const columnHelperLayer1 = createColumnHelper<Layer1Chains>();

export const layer1Top = [
  columnHelperLayer1.accessor("name", {
    id: "name",
    cell: (info) => {
      const logoUrl = info.row.original.imageUrl;
      const rowIndex = info.row.index;
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              paddingRight: "5px",
            }}
          >
            {rowIndex + 1}
          </span>
          <img
            src={logoUrl}
            alt="logo"
            style={{
              marginRight: "8px",
              width: "24px",
              height: "24px",
              borderRadius: "100%",
            }}
          />
          <span>{info.getValue()}</span>
        </div>
      );
    },
    header: () => <span>Name</span>,
  }),
  columnHelperLayer1.accessor("protocols", {
    id: "protocols",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Protocols</span>,
  }),
  columnHelperLayer1.accessor("activeAddresses", {
    id: "activeAddresses",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Addresses</span>,
  }),
  columnHelperLayer1.accessor("oneDayChange", {
    id: "oneDayChange",
    cell: (info) => (
      <span
        className={info.getValue().includes("-") ? styles.red : styles.green}
      >
        {info.getValue()}
      </span>
    ),
    header: () => <span>1d Change</span>,
  }),
  columnHelperLayer1.accessor("oneWeekChange", {
    id: "oneWeekChange",
    cell: (info) => (
      <span
        className={info.getValue().includes("-") ? styles.red : styles.green}
      >
        {info.getValue()}
      </span>
    ),
    header: () => <span>7d Change</span>,
  }),
  columnHelperLayer1.accessor("oneMonthChange", {
    id: "oneMonthChange",
    cell: (info) => (
      <span
        className={info.getValue().includes("-") ? styles.red : styles.green}
      >
        {info.getValue()}
      </span>
    ),
    header: () => <span>1m Change</span>,
  }),
  columnHelperLayer1.accessor("tvl", {
    id: "tvl",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>TVL</span>,
  }),
  columnHelperLayer1.accessor("stables", {
    id: "stables",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Bridged TVL</span>,
  }),
  columnHelperLayer1.accessor("oneDayVolume", {
    id: "oneDayVolume",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>24h Volume</span>,
  }),
  columnHelperLayer1.accessor("oneDayFees", {
    id: "oneDayFees",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>24h Fees</span>,
  }),
  columnHelperLayer1.accessor("mcapToTVL", {
    id: "mcapToTVL",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>MCap/TVL</span>,
  }),
  columnHelperLayer1.accessor("totalBridged", {
    id: "totalBridged",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Total Bridged</span>,
  }),
];
