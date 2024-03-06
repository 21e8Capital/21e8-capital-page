import { createColumnHelper } from "@tanstack/react-table";
import styles from "./styles.module.scss";

const columnHelperMarket = createColumnHelper<FormattedMarketStats>();
const columnHelperPerformance = createColumnHelper<PerformanceDataType>();

export const performanceColumns = [
  columnHelperPerformance.accessor("period", {
    id: "period",
    cell: (info) => info.getValue(),
    header: () => <span>Period</span>,
  }),
  columnHelperPerformance.accessor((row) => row.priceChange, {
    id: "priceChange",
    cell: (info) => (
      <span
        className={info.getValue().includes("-") ? styles.red : styles.green}
      >
        {info.getValue()}
      </span>
    ),
    header: () => <span>Change</span>,
  }),
  columnHelperPerformance.accessor("percentageChange", {
    id: "percentageChange",
    cell: (info) => (
      <span
        className={info.getValue().includes("-") ? styles.red : styles.green}
      >
        {info.getValue()}
      </span>
    ),
    header: () => <span>Change(%)</span>,
  }),
  columnHelperPerformance.accessor("highestPrice", {
    id: "highestPrice",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>High</span>,
  }),
];

export const marketStatsColumn = [
  columnHelperMarket.accessor("label" as any, {
    id: "label",
    cell: (info) => <span className={styles.info}>{info.getValue()}</span>,
    header: () => <span></span>,
  }),
  columnHelperMarket.accessor((row) => row.latest, {
    id: "latest",
    cell: (info) => (
      <span className={styles.latest}>
        {formatNumber(Number(info.getValue()))}
      </span>
    ),
    header: () => <span>Latest</span>,
  }),
  columnHelperMarket.accessor("changeInNumber", {
    id: "changeInNumber",
    cell: (info) => (
      <span
        className={
          String(info.getValue()).includes("-") ? styles.red : styles.green
        }
      >
        {info.getValue() === undefined
          ? "-"
          : formatNumber(Number(info.getValue()))}
      </span>
    ),
    header: () => <span>1w Change</span>,
  }),
  columnHelperMarket.accessor("changeInPercent", {
    id: "changeInPercent",
    cell: (info) => (
      <span
        className={
          String(info.getValue()).includes("-") ? styles.red : styles.green
        }
      >
        {info.getValue() === undefined ? "-" : `${info.getValue()}%`}
      </span>
    ),
    header: () => <span>1w Change(%)</span>,
  }),
];

const formatNumber = (number: number): string => {
  if (number === 0) return "0";

  const isNegative = number < 0;
  const absNumber = Math.abs(number);
  const suffixes = ["", "thousand", "million", "billion", "trillion"];
  const magnitude = Math.floor(Math.log10(absNumber) / 3);
  const scaledNumber = absNumber / Math.pow(10, magnitude * 3);
  const roundedNumber = Math.round(scaledNumber * 10) / 10; // Round to one decimal place

  return `${isNegative ? "-" : ""}${roundedNumber} ${suffixes[magnitude]}`;
};
