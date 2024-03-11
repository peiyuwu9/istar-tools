import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Root() {
  const location = useLocation();
  const navLinks = {
    "/": {
      name: "Home",
      title: "Welcome!",
      to: "/",
      icon: <Home />,
    },
    "/customer-proposal": {
      name: "Customer Proposal",
      title: "Customer Proposal",
      to: "/customer-proposal",
      icon: <BarChart3 />,
    },
  };

  return (
    <div className="flex text-xl">
      <div
        id="sidebar"
        className="flex-none h-screen w-[300px] p-10 bg-white shadow-lg"
      >
        <h2 className="text-5xl my-2 italic font-serif tracking-widest">
          iStar
        </h2>
        <nav className="flex flex-col gap-7 my-20">
          {Object.values(navLinks).map(({ name, to, icon }) => (
            <NavLink
              to={to}
              className={(status) =>
                cn(status.isActive ? "active" : "", "flex items-center gap-2")
              }
              key={name}
            >
              {icon}
              {name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div id="content" className="flex-1 min-w-[850px] p-5">
        <h1 className="text-6xl px-10 py-5 tracking-wider">
          {navLinks[location.pathname].title}
        </h1>
        <div
          id="container"
          className="h-[calc(100vh-160px)] p-10 bg-white rounded-lg shadow"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
