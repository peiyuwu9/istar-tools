import { useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigation } from "react-router-dom";
import useResizeObserver from "@react-hook/resize-observer";
import { BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { routeConstants } from "@/constants";
import { BarLoader } from "react-spinners";

export default function Root() {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const target = useRef(null);
  const [contentSize, setContentSize] = useState();
  const navLinks = {
    home: {
      icon: <Home />,
    },
    "customer-proposals": {
      icon: <BarChart3 />,
    },
  };

  useResizeObserver(target, (entry) => setContentSize(entry.contentRect));

  return (
    <div className="flex text-md">
      <div
        id="sidebar"
        className="flex-none h-screen w-[240px] p-5 bg-white shadow-lg"
      >
        <h2 className="text-3xl my-4 italic font-serif tracking-widest text-center">
          iStar
        </h2>
        <nav className="flex flex-col gap-6 my-16 p-2 w-fit mx-auto">
          {Object.keys(navLinks).map((navLink) => {
            const { name, path } = routeConstants[navLink];
            return (
              <NavLink
                to={path.get}
                className={(status) =>
                  cn(status.isActive ? "active" : "", "flex items-center gap-1")
                }
                key={name}
              >
                {navLinks[navLink].icon}
                {name}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div id="content" className="flex-1 min-w-[900px] p-3">
        <h1 className="text-4xl px-8 py-5 tracking-wider">
          {routeConstants[pathname === "/" ? "home" : pathname.slice(1)].title}
        </h1>
        <div
          ref={target}
          id="container"
          className="h-[calc(100vh-112px)] p-8 bg-white rounded-lg shadow"
        >
          {navigation.state === "loading" ? (
            <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
              <p>Loading...</p>
              <BarLoader color="#ffe54c" />
            </div>
          ) : (
            <Outlet context={contentSize} />
          )}
        </div>
      </div>
    </div>
  );
}
