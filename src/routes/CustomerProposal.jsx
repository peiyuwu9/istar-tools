import { useState } from "react";
import { useLoaderData } from "react-router";
import { Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomerProposal() {
  const { customerProposals, customers } = useLoaderData();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

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
    <>
      <DataTable columns={columns} data={customerProposals} />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">New</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>Create Customer Proposal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Customer
              </Label>
              <Select id="customer">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(({ name }) => (
                    <SelectItem value={name} key={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="program" className="text-right">
                Program
              </Label>
              <Input
                id="program"
                placeholder="Enter program here..."
                className="col-span-3"
                maxlength="30"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="styles" className="text-right">
                Style Numbers
              </Label>
              <Textarea
                id="styles"
                placeholder="Please enter newline for each style..."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
