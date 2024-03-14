import { useState } from "react";
import { useLoaderData } from "react-router";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCustomerProposal } from "@/lib/actions";
import { PacmanLoader } from "react-spinners";
import { dataSchemaSpec } from "@/constants";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  customer: z.string().min(1, { message: "Please select customer" }),
  program: z.string().trim().min(1, { message: "Please enter program name" }),
  // exmaple: BBY100162011\nSSS100163011 ->  BBY100162011,SSS100163011
  styles: z
    .string()
    .trim()
    .min(12, { message: "Please enter at least one valid style number" })
    .transform((val) => (val ? val.replaceAll("\n", ",") : z.NEVER)),
});

export function CustomerProposalForm() {
  const { customers } = useLoaderData();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // define form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      program: "",
      styles: "",
    },
  });

  function handleClose() {
    form.reset();
    return setOpen(false);
  }

  async function handleSubmit(data) {
    setLoading(true);
    const res = await createCustomerProposal(data);
    form.reset();
    return setLoading(false);
  }

  return (
    <>
      <Dialog open={loading || open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="default" className="text-lg">
            <Plus className="h-5 w-5 mr-2" />
            New
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[600px]">
          <DialogHeader>
            <DialogTitle className="tracking-wide">
              New Customer Proposal
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              id="customer-proposal-form"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mr-4">Customer</FormLabel>
                    <FormControl>
                      <Combobox
                        selections={customers}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Max ${dataSchemaSpec.customerProposalProgramMaxLength} characters here...`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="styles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style Numbers</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter newline for each style..."
                        className="h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="destructive" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="customer-proposal-form"
              disabled={loading}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {loading && (
        <div className="w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center gap-4 bg-slate-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 z-[100] pointer-events-auto">
          <PacmanLoader color="#ffe54c" className="-translate-x-5" />
          <h3 className="text-2xl">
            We are generating your customer proposal...
          </h3>
        </div>
      )}
    </>
  );
}
