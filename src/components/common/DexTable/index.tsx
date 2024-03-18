import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import styles from "./styles.module.scss";

interface TableProps {
  id?: string;
  title: string;
  data: any[];
  columns: ColumnDef<any, any>[];
  className?: string;
}

const DexTable = ({ data, columns, title, className, id }: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.dex}>
      <div className={`${styles.dynamicTable} ${className}`} id={id}>
        <div className={styles.topSide}>
          <p>{title}</p>
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
        </table>
        <div className={styles.radialGradient}></div>
      </div>
    </div>
  );
};

export default DexTable;
