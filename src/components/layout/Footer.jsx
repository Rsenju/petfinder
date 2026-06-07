import { Link } from "react-router-dom";

const footerLinks = [
  ["Pets", "/pets"],
  ["ONGs", "/ongs"],
  ["Serviços", "/servicos"],
  ["Blog", "/blog"],
  ["Utilidade pública", "/governo"],
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-4 py-8 text-sm text-slate-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p>PetFinder - adoção responsável com tecnologia simples e humana.</p>
        <nav className="flex flex-wrap items-center justify-center gap-3">
          {footerLinks.map(([label, href]) => (
            <Link key={href} to={href} className="text-slate-400 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
