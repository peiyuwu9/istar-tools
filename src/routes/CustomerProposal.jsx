import { useState } from "react";
import { useLoaderData } from "react-router";
import { Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";

export default function CustomerProposal() {
  const { data } = useLoaderData();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

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
          <Badge>{row.original.customer}</Badge>
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
      id: "actions",
      cell: ({ row }) => {
        const url = row.original.url;
        return (
          <div className="flex justify-evenly">
            <a href={url} download>
              <Download className="hover:text-green-500"/>
            </a>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
