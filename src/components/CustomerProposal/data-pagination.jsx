import { useEffect, useState } from "react";
import { cn, getPaginationPages } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function DataTablePagination({ table }) {
  const [pagination, setPagination] = useState([1]);
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPage = table.getPageCount();

  useEffect(() => {
    setPagination(getPaginationPages(currentPage, totalPage));
  }, [currentPage, totalPage]);

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm">Rows per Page</p>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className={cn(
              !table.getCanPreviousPage()
                ? "text-slate-900/30 pointer-events-none"
                : "cursor-pointer"
            )}
            onClick={() => table.getCanPreviousPage() && table.previousPage()}
          >
            <PaginationPrevious />
          </PaginationItem>
          {totalPage > 5 && currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pagination.map((pageNum) => (
            <PaginationItem
              className="cursor-pointer"
              key={pageNum}
              onClick={() => table.setPageIndex(pageNum - 1)}
            >
              <PaginationLink isActive={pageNum === currentPage}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPage > 5 && currentPage < totalPage - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem
            className={cn(
              !table.getCanNextPage()
                ? "text-slate-900/30 pointer-events-none"
                : "cursor-pointer"
            )}
            onClick={() => table.getCanNextPage() && table.nextPage()}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
