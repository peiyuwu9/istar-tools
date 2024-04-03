import { useState } from "react";
import { useOutletContext } from "react-router";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { createCustomerProposal } from "@/lib/actions";
import { dataSchemaSpec } from "@/constants";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { Submit } from "@/components/ui/submit-dialog";
import { Toaster } from "@/components/ui/toaster";
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
  program: z.string().trim().min(1, { message: "Please enter program name" }),
  customer: z.string().min(1, { message: "Please select customer" }),
  // exmaple: BBY100162011\nSSS100163011 ->  BBY100162011,SSS100163011
  styles: z
    .string()
    .trim()
    .min(12, { message: "Please enter at least one valid style number" })
    .transform((val) => (val ? val.replaceAll("\n", ",") : z.NEVER)),
  market1: z.coerce.number().optional(),
  market2: z.coerce.number().optional(),
  market3: z.coerce.number().optional(),
});

export function CustomerProposalForm({ refetch }) {
  const { customers } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { isLoading, mutate, status } = useMutation(
    (data) => createCustomerProposal(data),
    {
      onSuccess: (data) => {
        if (data.message !== "No Inventory ID Found!") refetch(); // refetch data for customer proposal table
        setMessage(data.message);
      },
    }
  );

  // define form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program: "",
      customer: "",
      styles: "",
      market1: "",
      market2: "",
      market3: "",
    },
  });

  function handleSubmit(data) {
    const mutateData = {
      program: data.program,
      customer: data.customer,
      styles: data.styles,
      markets: {
        market1: data.market1,
        market2: data.market2,
        market3: data.market3,
      },
    };
    mutate(mutateData);
    return form.reset();
  }

  function handleFormSubmit(e) {
    if (message) setMessage("");
    return form.handleSubmit(handleSubmit)(e);
  }

  function handleChange() {
    if (message) setMessage("");
  }

  function handleClose() {
    if (message) setMessage("");
    form.reset();
    return setOpen(false);
  }

  return (
    <>
      <Dialog open={isLoading || open} onOpenChange={setOpen}>
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
              onSubmit={handleFormSubmit}
              onChange={handleChange}
              className="space-y-4"
            >
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
              <div className="flex gap-5">
                <div className="flex flex-col gap-4 w-1/2">
                  <FormField
                    control={form.control}
                    name="customer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mr-4">Customer</FormLabel>
                        <FormControl>
                          <Combobox
                            defaultValue="Select Customer"
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
                    name="styles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Style Numbers</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter newline or separate by comma for each style..."
                            className="h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                  <FormField
                    control={form.control}
                    name="market1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Market Value 1</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 20.25" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="market2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Market Value 2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="market3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Market Value 3</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
          <DialogFooter className="gap-2 sm:gap-0">
            {message && (
              <div className="flex-1">
                {message.split("\n").map((message) => (
                  <p className=" text-red-500" key={message}>
                    {message}
                  </p>
                ))}
              </div>
            )}
            <Button variant="destructive" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="customer-proposal-form"
              disabled={isLoading}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isLoading && (
        <Submit>We are generating your customer proposal...</Submit>
      )}
      <Toaster
        status={status}
        message={
          status === "success" ? "Submission Successed!" : "Submission Failed!"
        }
      />
    </>
  );
}
