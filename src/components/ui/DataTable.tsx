import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export interface Column<T> {
  id: string;
  header: ReactNode;
  align?: "left" | "center" | "right";
  numeric?: boolean;
  headerClassName?: string;
  cellClassName?: string | ((row: T) => string);
  cell: (row: T, index: number) => ReactNode;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

/**
 * One generic, config-driven table (built on the shadcn/ui Table primitives)
 * used by every static listing on the site. Server-safe — no hooks.
 */
export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  rowClassName,
  minWidth,
  emptyMessage = "No data.",
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  rowClassName?: (row: T) => string | undefined;
  minWidth?: string;
  emptyMessage?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      <Table minWidth={minWidth}>
        <TableHeader>
          <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className={cn("text-primary-foreground", alignClass[col.align ?? "left"], col.headerClassName)}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="py-6 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, i) => (
              <TableRow key={getRowKey(row, i)} className={rowClassName?.(row)}>
                {columns.map((col) => {
                  const extra =
                    typeof col.cellClassName === "function" ? col.cellClassName(row) : col.cellClassName;
                  return (
                    <TableCell
                      key={col.id}
                      className={cn(alignClass[col.align ?? "left"], col.numeric && "tnum", extra)}
                    >
                      {col.cell(row, i)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
