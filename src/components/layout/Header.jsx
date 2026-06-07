import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import { useAuth } from "../../hooks/useAuth";

const publicLinks = [
  ["Pets", "/pets"],
  ["ONGs", "/ongs"],
  ["Serviços", "/servicos"],
];

export default function Header() {
  const { isAuthenticated, isAdmin, isOng, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const privateHref = isAdmin ? "/admin" : isOng ? "/dashboard" : "/pets";
  const privateLabel = isAdmin ? "Admin" : isOng ? "Dashboard" : "Pets";

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" aria-label="PetFinder home" onClick={closeMenu}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-2 text-sm md:flex">
          <NavItems
            isAuthenticated={isAuthenticated}
            privateHref={privateHref}
            privateLabel={privateLabel}
            onNavigate={closeMenu}
            onLogout={handleLogout}
          />
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 md:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-slate-800 bg-slate-950 px-4 py-3 text-sm md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            <NavItems
              isAuthenticated={isAuthenticated}
              privateHref={privateHref}
              privateLabel={privateLabel}
              onNavigate={closeMenu}
              onLogout={handleLogout}
              mobile
            />
          </div>
        </nav>
      )}
    </header>
  );
}

function NavItems({ isAuthenticated, privateHref, privateLabel, onNavigate, onLogout, mobile = false }) {
  const linkClass = ({ isActive }) =>
    `${mobile ? "block" : ""} rounded-lg px-3 py-2 transition ${
      isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {publicLinks.map(([label, href]) => (
        <NavLink key={href} to={href} onClick={onNavigate} className={linkClass}>
          {label}
        </NavLink>
      ))}

      {isAuthenticated ? (
        <>
          <NavLink to={privateHref} onClick={onNavigate} className={linkClass}>
            {privateLabel}
          </NavLink>
          <button
            type="button"
            onClick={onLogout}
            className={`${mobile ? "block text-left" : ""} rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white`}
          >
            Sair
          </button>
        </>
      ) : (
        <NavLink to="/login" onClick={onNavigate} className={linkClass}>
          Login
        </NavLink>
      )}
    </>
  );
}
