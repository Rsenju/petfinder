import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Phone, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../ui/Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated, isOng } = useAuth();

  // Links corrigidos - removido "Cuidados", adicionado links faltantes
  const navLinks = [
    { to: "/caes", label: "Cachorros" },
    { to: "/gatos", label: "Gatos" },
    { to: "/servicos", label: "Serviços" },
    { to: "/ongs", label: "ONGs" },
    { to: "/petshops", label: "Pet Shops" },
    { to: "/blog", label: "Blog" },
    { to: "/governo", label: "Governo" },
  ];

  const handleUserClick = () => {
    if (isAuthenticated && isOng) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handlePhoneClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation - SEMPRE VISÍVEL */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-xs mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handlePhoneClick}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                title="Contato de Emergência"
              >
                <Phone className="w-5 h-5 text-slate-400" />
              </button>

              <button
                onClick={handleUserClick}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                title={isAuthenticated ? "Minha Conta" : "Entrar"}
              >
                <User
                  className={`w-5 h-5 ${isAuthenticated ? "text-blue-400" : "text-slate-400"}`}
                />
              </button>

              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Entrar
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-slate-400" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 bg-slate-900">
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-700 mt-4 space-y-2">
                <button
                  onClick={() => {
                    handlePhoneClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
                >
                  <Phone className="w-5 h-5" />
                  Contato de Emergência
                </button>

                <button
                  onClick={() => {
                    handleUserClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated ? "Minha Conta" : "Entrar"}
                </button>

                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Modal de Contato */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Phone className="w-6 h-6 text-blue-400" />
                Contato de Emergência
              </h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                <p className="font-semibold text-red-400 mb-1">
                  Emergência Veterinária 24h
                </p>
                <p className="text-2xl font-bold text-red-400">
                  (71) 99999-9999
                </p>
              </div>

              <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                <p className="font-semibold text-blue-400 mb-1">
                  Suporte PetFinder
                </p>
                <p className="text-lg font-bold text-blue-400">
                  contato@petfinder.com.br
                </p>
              </div>

              <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                <p className="font-semibold text-green-400 mb-1">
                  Denúncias de Maus-tratos
                </p>
                <p className="text-lg font-bold text-green-400">
                  0800-123-4567
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsContactModalOpen(false)}
              className="w-full mt-6 bg-slate-700 text-white py-3 rounded-xl font-medium hover:bg-slate-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}