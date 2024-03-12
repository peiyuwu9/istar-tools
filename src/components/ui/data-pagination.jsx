import { cn } from "@/lib/utils";

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
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={1} />
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
          {/* {totalPage > 2 && currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )} */}
          <PaginationItem className="cursor-pointer">
            <PaginationLink isActive>1</PaginationLink>
          </PaginationItem>
          {/* {totalPage > 2 && currentPage < totalPage - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )} */}
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
