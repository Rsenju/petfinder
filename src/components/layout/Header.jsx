import { Link, NavLink } from "react-router-dom";
import Logo from "../ui/Logo";

const links = [
  ["Pets", "/pets"],
  ["ONGs", "/ongs"],
  ["Servicos", "/servicos"],
  ["Login", "/login"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" aria-label="PetFinder home">
          <Logo />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
          {links.map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
