import { Link } from "react-router-dom";
import { routeConstants } from "@/constants";

export default function Home() {
  const columns = ["left", "right"];
  const navLinks = ["home", "customer-proposals"];

  return (
    <div className="h-full flex p-14">
      {columns.map((column) => (
        <div
          className="w-1/2 flex flex-col flex-grow justify-start items-center gap-16"
          key={column}
        >
          {navLinks.map((navLink, index) => {
            if (
              (column === "left" && index % 2 !== 0) ||
              (column === "right" && index % 2 === 0)
            )
              return null;

            const { name, path } = routeConstants[navLink];

            return (
              <Link to={path.get} className="button-home" key={name}>
                {name}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
