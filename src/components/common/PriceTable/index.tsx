import DynamicTable from "./DynamicTable";
import { marketStatsColumn, performanceColumns } from "./coulms";
import styles from "./styles.module.scss";

interface PriceTableProps {
  title: string;
  performance: PerformanceDataType[];
  marketStats: MarketStatsDataType[];
}

const PriceTable = ({ title, performance, marketStats }: PriceTableProps) => (
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
        data={marketStats}
        className={styles.marketTable}
        columns={marketStatsColumn}
      />
    </div>
  </div>
);

export default PriceTable;
