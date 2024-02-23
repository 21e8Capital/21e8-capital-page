import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  TableState,
} from "@tanstack/react-table";
import styles from "./styles.module.scss";
import DynamicTable from "./DynamicTable";

interface PriceTableProps {
  title: string;
  performance: PerformanceDataType[];
  marketStats?: any;
}

const columnHelper = createColumnHelper<PerformanceDataType>();

const performanceColumns = [
  columnHelper.accessor("period", {
    id: "period",
    cell: (info) => info.getValue(),
    header: () => <span>Period</span>,
  }),
  columnHelper.accessor((row) => row.priceChange, {
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
  columnHelper.accessor("percentageChange", {
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
  columnHelper.accessor("highestPrice", {
    id: "highestPrice",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>High</span>,
  }),
];

const PriceTable = ({ title, performance }: PriceTableProps) => {
  return (
    <div className={styles.priceTable}>
      <h1>{title}</h1>
      <div className={styles.tableGrid}>
        <DynamicTable
          title="Bitcoin Price Performance"
          data={performance}
          columns={performanceColumns}
        />
        <DynamicTable
          title="Bitcoin Market Stats"
          data={performance}
          columns={performanceColumns}
        />
      </div>
    </div>
  );
};

export default PriceTable;
