import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { layer1Top } from "./columns";
import { Anchor } from "@/svg";

interface TableProps {
  id?: string;
  title: string;
  data: Layer1Chains[];
  columns: ColumnDef<any, any>[];
  className?: string;
}

const Layer1Table = ({ data, columns, title, className, id }: TableProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(
    new Set(layer1Top.keys())
  );

  const allOptionalColumnIds = [
    "tvl",
    "name",
    "stables",
    "protocols",
    "mcapToTVL",
    "oneDayFees",
    "totalBridged",
    "oneDayVolume",
    "oneDayChange",
    "oneWeekChange",
    "oneMonthChange",
    "activeAddresses",
  ];

  function handleColumnToggle(columnId: number) {
    setSelectedColumns((prevSelectedColumns) => {
      const newSelectedColumns = new Set(prevSelectedColumns);
      if (newSelectedColumns.has(columnId)) {
        newSelectedColumns.delete(columnId);
      } else {
        newSelectedColumns.add(columnId);
      }
      return newSelectedColumns;
    });
  }

  const filteredColumns = columns.filter((column) =>
    selectedColumns.has(column.id as any)
  );

  const table = useReactTable({
    data,
    columns: filteredColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setSelectedColumns(
      new Set([
        // @ts-ignore
        ...selectedColumns,
        ...allOptionalColumnIds,
      ])
    );
  }, []);

  return (
    <div className={styles.layer1Top}>
      <div className={`${styles.dynamicTable} ${className}`} id={id}>
        <div className={styles.topSide}>
          <p>{title}</p>
          <div className={styles.customDropdown}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Columns
              <Anchor
                className={`${styles.anchor} ${
                  isDropdownOpen && styles.activeAnchor
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                {layer1Top
                  .filter((column) => column.id !== "name")
                  .map((column) => (
                    <label key={column.id}>
                      <input
                        type="checkbox"
                        checked={selectedColumns.has(column.id as any)}
                        onChange={() => handleColumnToggle(column.id as any)}
                        disabled={column.id === "name"}
                      />
                      <span>{column.id}</span>
                    </label>
                  ))}
              </div>
            )}
          </div>
        </div>

        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className={styles.radialGradient}></div>
      </div>
    </div>
  );
};

export default Layer1Table;
