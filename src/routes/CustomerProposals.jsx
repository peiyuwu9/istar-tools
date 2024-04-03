import { useState } from "react";
import { Download } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getCustomerProposals } from "@/lib/actions";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/CustomerProposal/data-table";
import { DataTablePagination } from "@/components/CustomerProposal/data-pagination";
import { DataTableHearder } from "@/components/CustomerProposal/data-table-header";
import { CustomerProposalForm } from "@/components/CustomerProposal/form";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/ui/loading-dialog";
import { useQuery } from "react-query";
import ErrorPage from "../components/ErrorPage";

export default function CustomerProposals() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [columnFilters, setColumnFilters] = useState([]);
  const { data, error, isLoading, refetch } = useQuery(
    ["customerProposals", year],
    () => getCustomerProposals(year),
    {
      refetchOnWindowFocus: false,
    }
  );

  const columns = [
    {
      accessorKey: "program",
      header: "Program",
    },
    {
      accessorKey: "customer",
      header: () => <div className="text-center">Customer</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge>{row.original.customer}</Badge>
        </div>
      ),
      size: 100,
    },
    {
      accessorKey: "created_at",
      header: () => <div className="text-center">Created At</div>,
      cell: ({ row }) => {
        const { seconds, nanoseconds } = row.original.created_at;
        return (
          <div className="text-center">
            {formatDate(seconds * 1000 + nanoseconds / 100000)}
          </div>
        );
      },
      size: 100,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const url = row.original.url;
        const id = row.original.id;
        return (
          <div className="flex justify-evenly">
            <a href={url} download>
              <Download className="hover:text-green-500" />
            </a>
            <span data-id={id} onClick={handleDelete}></span>
          </div>
        );
      },
      size: 50,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  function handleDelete(e) {
    const element = e.target.closest("[data-id]");
    console.log(element.dataset.id);
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <DataTableHearder table={table} year={year} setYear={setYear}>
        <CustomerProposalForm refetch={refetch} />
      </DataTableHearder>
      {error ? (
        <ErrorPage message={error?.message} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex-1">
            <DataTable columns={columns} table={table} />
          </div>
          <DataTablePagination table={table} />
        </>
      )}
    </div>
  );
}
