import { Link, NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import { useAuth } from "../../hooks/useAuth";

const links = [
  ["Pets", "/pets"],
  ["ONGs", "/ongs"],
  ["Servicos", "/servicos"],
  ["Login", "/login"],
];

export default function Header() {
  const { isAuthenticated, isAdmin, isOng, logout } = useAuth();
  const privateHref = isAdmin ? "/admin" : isOng ? "/dashboard" : "/pets";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" aria-label="PetFinder home">
          <Logo />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
          {links.filter(([label]) => isAuthenticated || label !== "Login").map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
              {label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <NavLink to={privateHref} className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
                {isAdmin ? "Admin" : isOng ? "Dashboard" : "Pets"}
              </NavLink>
              <button onClick={logout} className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800">
                Sair
              </button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
