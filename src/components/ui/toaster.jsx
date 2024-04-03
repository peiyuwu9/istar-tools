import { useEffect } from "react";
import toast, { Toaster as ToasterProvider } from "react-hot-toast";

function Toaster({ status, message }) {
  useEffect(() => {
    switch (status) {
      case "error":
        toast.error(message);
        break;
      case "success":
        toast.success(message);
        break;
    }
  }, [status, message]);

  if (status === "idle") return null;

  return <ToasterProvider />;
}

export { Toaster };
