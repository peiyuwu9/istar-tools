import { Link } from "react-router-dom";
import { routeConstants } from "@/constants";

export default function Home() {
  const navLinks = ["home", "customer-proposals"];

  return (
    <div className="h-full flex p-14">
      <div className="w-1/2 flex flex-col flex-grow justify-start items-center gap-16">
        {navLinks.map((navLink, index) => {
          if (index % 2 !== 0) return <></>;
          const { path, name } = routeConstants[navLink];
          return (
            <Link to={path} className="button-home" key={name}>
              {name}
            </Link>
          );
        })}
      </div>
      <div className="w-1/2 flex flex-col flex-grow justify-start items-center gap-16">
        {navLinks.map((navLink, index) => {
          if (index % 2 === 0) return <></>;
          const { path, name } = routeConstants[navLink];
          return (
            <Link to={path} className="button-home" key={name}>
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
