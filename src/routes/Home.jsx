import { Link } from "react-router-dom";

export default function Home() {
  const navLinks = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Customer Proposal",
      to: "/customer-proposal",
    },
  ];

  return (
    <div className="h-full flex p-20">
      <div className="w-1/2 flex flex-col flex-grow justify-start items-center gap-16">
        {navLinks.map(({ name, to }, index) => {
          if (index % 2 !== 0) return <></>;
          return (
            <Link to={to} className="button-home" key={name}>
              {name}
            </Link>
          );
        })}
      </div>
      <div className="w-1/2 flex flex-col flex-grow justify-start items-center gap-16">
        {navLinks.map(({ name, to }, index) => {
          if (index % 2 === 0) return <></>;
          return (
            <Link to={to} className="button-home" key={name}>
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
