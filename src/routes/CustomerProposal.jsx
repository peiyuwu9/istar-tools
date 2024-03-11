import { Download } from "lucide-react";
import { useLoaderData } from "react-router";

import { DataTable } from "@/components/ui/data-table";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CustomerProposal() {
  const { data } = useLoaderData();

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "customer",
      header: () => <div className="text-center">Customer</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge>{row.original.customer}</Badge>{" "}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Created At</div>,
      cell: ({ row }) => {
        const { seconds, nanoseconds } = row.original.createdAt;
        return (
          <div className="text-center">
            {formatDate(seconds * 1000 + nanoseconds / 100000)}
          </div>
        );
      },
    },
    {
      id: "download",
      cell: <Download />,
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
