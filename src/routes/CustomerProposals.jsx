import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { useMutation, useQuery } from "react-query";
import { formatDate } from "@/lib/utils";
import { getCustomerProposals } from "@/lib/actions";
import { deleteCustomerProposal } from "@/lib/actions";
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
import ErrorPage from "@/components/ErrorPage";
import DeleteDialog from "@/components/DeleteDialog";

export default function CustomerProposals() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [columnFilters, setColumnFilters] = useState([]);
  const { data, error, isLoading, refetch } = useQuery(
    ["customerProposals", year],
    () => getCustomerProposals(year),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { mutate, status } = useMutation(
    (dataset) => deleteCustomerProposal(dataset.id, dataset.filename),
    {
      onSuccess: refetch, // refetch data for customer proposal table
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
        const filename = row.original.filename;
        return (
          <div className="flex justify-evenly">
            <a href={url} download>
              <Download className="hover:text-green-500" />
            </a>
            <span data-id={id} data-filename={filename} onClick={handleClick}>
              <Trash2 className="hover:text-red-500" />
            </span>
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

  function handleClick(e) {
    setOpen(true);
    return setTarget(e.target.closest("[data-id]"));
  }

  // no need to use aync function since useMutation handle it already
  function handleDelete(data) {
    return deleteCustomerProposal(data.id, data.filename);
  }

  return (
    <>
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
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        content={target?.dataset?.filename}
        action={handleDelete}
        data={target?.dataset}
        refetch={refetch}
      />
    </>
  );
}
