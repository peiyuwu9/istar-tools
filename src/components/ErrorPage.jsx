import { useRouteError } from "react-router";
import { Beer } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  if (error?.status === 404)
    return <img src="./404-page.jpg" className="w-full h-screen" />;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <Beer size={45} color="#ffe54c" />
      <h4 className="text-xl">Oops! Something Went Wrong!</h4>
    </div>
  );
}
