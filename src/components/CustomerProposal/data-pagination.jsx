import { useEffect, useState } from "react";
import { cn, getPaginationPages } from "@/lib/utils";

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
    <Pagination className={"mx-auto"}>
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
        {totalPage > 5 && currentPage > 3 && (
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
        {totalPage > 5 && currentPage < totalPage - 2 && (
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
  );
}
