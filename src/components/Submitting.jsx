import { PacmanLoader } from "react-spinners";

export default function Submitting({ children }) {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center gap-4 bg-slate-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 z-[100] pointer-events-auto">
      <div className="relative">
        <PacmanLoader
          color="#ffe54c"
          className="-translate-x-5 drop-shadow-sm"
        />
        <div className="packman-loader-shadow" />
      </div>
      <h3 className="text-2xl">{children}</h3>
    </div>
  );
}
