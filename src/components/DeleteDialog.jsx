import { useMutation } from "react-query";

import { Toaster } from "@/components/ui/toaster";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DeleteDialog({
  action,
  content,
  data,
  open,
  refetch,
  setOpen,
}) {
  const { mutate, status } = useMutation(action, {
    onSuccess: refetch, // refetch data for customer proposal table
  });

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              You are deleting below data and this action cannot be undone.
              <br />
              <b>{content}</b>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate(data)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster
        status={status}
        message={status === "success" ? "Data Deleted!" : "Data Delete Failed!"}
      />
    </>
  );
}
