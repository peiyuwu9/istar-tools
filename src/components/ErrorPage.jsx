import { useRouteError } from "react-router";
import { Beer } from "lucide-react";

export default function ErrorPage({ message }) {
  const error = useRouteError() || message;
  if (error?.status === 404)
    return (
      <div className="w-full h-screen bg-[url('./404-page.jpg')] bg-no-repeat bg-cover bg-center"></div>
    );
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <Beer size={45} color="#ffe54c" />
      <h4 className="text-xl">Oops! {message}</h4>
    </div>
  );
}
