import { createColumnHelper } from "@tanstack/react-table";
import styles from "./styles.module.scss";
import PercentageBar from "./PercentageBar";

const columnHelperPerp = createColumnHelper<Perp>();
const columnHelperDex = createColumnHelper<Dex>();

export const perpColumns = [
  columnHelperPerp.accessor("#", {
    id: "#",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>#</span>,
  }),
  columnHelperPerp.accessor("address", {
    id: "address",
    cell: (info) => (
      <span>
        <a
          href={`https://etherscan.io/address/${info.getValue()}`}
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          {info.getValue()}
        </a>
      </span>
    ),
    header: () => <span>Addresses</span>,
  }),
  columnHelperPerp.accessor("quantity", {
    id: "quantity",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Quantity</span>,
  }),
  columnHelperPerp.accessor("percentage", {
    id: "percentage",
    cell: (info) => (
      <span>
        <PercentageBar percentage={info.getValue()} />
      </span>
    ),
    header: () => <span>Percentage</span>,
  }),
  columnHelperPerp.accessor("7d change", {
    id: "7d change",
    cell: (info) => (
      <span
        style={{
          paddingLeft: "20px",
        }}
      >
        {info.getValue()}
      </span>
    ),
    header: () => (
      <span
        style={{
          paddingLeft: "20px",
        }}
      >
        1d Change
      </span>
    ),
  }),
];

export const dexColumns = [
  columnHelperDex.accessor("#", {
    id: "#",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>#</span>,
  }),
  columnHelperDex.accessor("name", {
    id: "name",
    cell: (info) => {
      const logoUrl = info.row.original.logoUrl;
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
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
  columnHelperDex.accessor("trading volume(24h)", {
    id: "trading volume(24h)",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Trading volume (24h)</span>,
  }),
  columnHelperDex.accessor("% mkt share", {
    id: "% mkt share",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>% Mkt Share</span>,
  }),
  columnHelperDex.accessor("noMarkets", {
    id: "noMarkets",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>No. Markets</span>,
  }),
  columnHelperDex.accessor("type", {
    id: "type",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Type</span>,
  }),
  columnHelperDex.accessor("launched", {
    id: "launched",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Launched</span>,
  }),
  columnHelperDex.accessor("volGraph", {
    id: "volGraph",
    cell: (info) => (
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <img
          src={info.getValue()}
          alt="logo"
          style={{
            width: "100%",
            height: "45px",
            marginLeft: "-14px",
          }}
        />
      </div>
    ),
    header: () => <span>Vol.Graph (7d)</span>,
  }),
];
