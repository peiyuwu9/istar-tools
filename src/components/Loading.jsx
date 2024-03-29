import { BarLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      <p>Loading...</p>
      <BarLoader color="#ffe54c" />
    </div>
  );
}
