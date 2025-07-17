"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ReactNode, RefObject, useRef, useState } from "react";
import UiPagination from "../ui-pagination/UiPaginatin";
import { IconLoader } from "@tabler/icons-react";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

export default function ManageTable<T>({
  columns,
  data,
  columnFilters,
  setColumnFilters,
  isShowDescription = false,
  isLoading = false,
  description,
  emptyMessage = "هیچ کاربری یافت نشد",
}: {
  columns: ColumnDef<T>[];
  data: T[];
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: (columnFilters: ColumnFiltersState) => void;
  isShowDescription?: boolean;
  isLoading: boolean;
  description?: ReactNode;
  emptyMessage?: string;
}) {
  const { open } = useSidebar();
  const ITEMS_PER_PAGE = 5;
  const cardsRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    onColumnFiltersChange: (updater) =>
      setColumnFilters?.(updater as ColumnFiltersState),
    state: {
      columnFilters,
    },
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageRows = filteredRows.slice(startIndex, endIndex);

  return (
    <div
      className={cn(
        "flex flex-col gap-5 w-full   overflow-x-auto",
        open ? " max-w-[1170px]" : "max-w-full"
      )}
    >
      <div className="rounded-lg overflow-hidden" ref={cardsRef}>
        <Table>
          {isShowDescription && (
            <TableCaption className="pt-2 border-t border-border">
              {description}
            </TableCaption>
          )}
          <TableHeader className="[&_tr]:!border-b-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-primary py-4 text-start"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="bg-muted">
                  <div className="flex justify-center items-center py-5">
                    <IconLoader size={16} className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : currentPageRows.length ? (
              currentPageRows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="even:bg-secondary/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-muted-foreground text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <UiPagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginationItemsToDisplay={5}
            onPageChange={setCurrentPage}
            cardsRef={cardsRef as RefObject<HTMLDivElement>}
          />
        </div>
      )}
    </div>
  );
}
