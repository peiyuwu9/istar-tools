import { useLoaderData } from "react-router";
import { Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { DataTable } from "@/components/CustomerProposal/data-table";
import { CustomerProposalForm } from "@/components/CustomerProposal/form";
import { Badge } from "@/components/ui/badge";

export default function CustomerProposals() {
  const { customerProposals } = useLoaderData();

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
        return (
          <div className="flex justify-evenly">
            <a href={url} download>
              <Download className="hover:text-green-500" />
            </a>
          </div>
        );
      },
      size: 50,
    },
  ];

  return (
    <DataTable columns={columns} data={customerProposals}>
      <CustomerProposalForm />
    </DataTable>
  );
}
