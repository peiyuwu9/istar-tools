import { useEffect, useState } from "react";
import toast, { Toaster as ToasterProvider } from "react-hot-toast";

function Toaster({ status, message }) {
  const [toastId, setToastId] = useState(null);

  console.log(toastId);

  useEffect(() => {
    switch (status) {
      case "error":
        setToastId(toast.error(message));
        break;
      case "success":
        setToastId(toast.success(message));
        break;
    }
  }, [status, message]);

  return <ToasterProvider />;
}

export { Toaster };
