import { useState } from "react";
import { useLoaderData } from "react-router";
import { Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import CustomerProposalFrom from "@/components/CustomerProposalForm";

export default function CustomerProposals() {
  const { customerProposals } = useLoaderData();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [open, setOpen] = useState(false);

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
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const url = row.original.url;
        return (
          <div className="flex justify-evenly">
            <a href={url} download>
              <Download className="hover:text-green-500" />
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable columns={columns} data={customerProposals}>
      <CustomerProposalFrom />
    </DataTable>
  );
}
