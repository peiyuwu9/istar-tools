import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { routeConstants } from "@/constants";

export default function Root() {
  const location = useLocation();
  const navLinks = {
    home: {
      icon: <Home />,
    },
    "customer-proposals": {
      icon: <BarChart3 />,
    },
  };

  return (
    <div className="flex text-md">
      <div
        id="sidebar"
        className="flex-none h-screen w-[240px] p-5 bg-white shadow-lg"
      >
        <h2 className="text-4xl my-4 py-1 italic font-serif tracking-widest text-center">
          iStar
        </h2>
        <nav className="flex flex-col gap-6 my-16 py-1 w-fit mx-auto">
          {Object.keys(navLinks).map((navLink) => {
            const { name, path } = routeConstants[navLink];
            return (
              <NavLink
                to={path}
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
        <h1 className="text-5xl px-10 py-5 tracking-wider">
          {
            routeConstants[
              location.pathname === "/" ? "home" : location.pathname.slice(1)
            ].title
          }
        </h1>
        <div
          id="container"
          className="h-[calc(100vh-112px)] p-10 bg-white rounded-lg shadow"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
