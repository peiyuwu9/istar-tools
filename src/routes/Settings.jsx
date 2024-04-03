import { useOutletContext } from "react-router";
import { CirclePlus } from "lucide-react";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

export default function Settings() {
  const { customers } = useOutletContext();

  return (
    <div className="h-full p-6">
      <div className="flex gap-10 items-center">
        <p>Customers</p>
        <div className="flex gap-2 items-center">
          <Combobox defaultValue="Customer List" selections={customers} />
          <Input placeholder={"Add Customer"} className="w-80" />
          <CirclePlus className="hover:text-brand hover:cursor-pointer"/>
        </div>
      </div>
    </div>
  );
}
