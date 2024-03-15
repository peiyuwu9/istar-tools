import { Search } from "lucide-react";
import { dataSchemaSpec } from "@/constants";

import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLoaderData } from "react-router";

export function DataTableHearder({ children, table }) {
  const { customers } = useLoaderData();
  // only list 5 years data
  const currentYear = new Date().getFullYear();
  const yearSelections = [];
  for (let i = 0; i < 5; i++) {
    yearSelections.push(currentYear - i);
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2">
        <Select value={""} onValueChange={(value) => {}}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder={currentYear} />
          </SelectTrigger>
          <SelectContent>
            {yearSelections.map((year) => (
              <SelectItem value={year} key={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative">
          <Input
            placeholder={`Search Program`}
            value={table.getColumn("program")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("program")?.setFilterValue(event.target.value)
            }
            className="w-80"
            maxLength={dataSchemaSpec.customerProposalProgramMaxLength}
          />
          <Search
            className="absolute right-3 top-3 text-slate-500"
            size={"18"}
          />
        </div>
        <Combobox
          selections={customers}
          value={table.getColumn("customer")?.getFilterValue() ?? ""}
          onChange={(value) =>
            table.getColumn("customer")?.setFilterValue(value)
          }
        />
      </div>
      {children}
    </div>
  );
}
