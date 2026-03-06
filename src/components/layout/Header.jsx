import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Phone, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../features/ThemeToggle';
import Logo from '../ui/Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, isAuthenticated, isOng } = useAuth();

  const navLinks = [
    { to: '/caes', label: 'Cachorros' },
    { to: '/gatos', label: 'Gatos' },
    { to: '/cuidados', label: 'Cuidados' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/blog', label: 'Blog' },
  ];

  // Handler para ícone User - redireciona baseado em autenticação
  const handleUserClick = () => {
    if (isAuthenticated && isOng) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  // Handler para ícone Phone - abre modal de contato
  const handlePhoneClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Logo size="md" />
            
            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar pets, serviços ou informações..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              
              {/* Phone - Modal de Contato */}
              <button 
                onClick={handlePhoneClick}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Contato de Emergência"
              >
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              {/* User - Dashboard ou Login */}
              <button 
                onClick={handleUserClick}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title={isAuthenticated ? "Minha Conta" : "Entrar"}
              >
                <User className={`w-5 h-5 ${isAuthenticated ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
              </button>
              
              {/* Botão Entrar (só aparece se não estiver logado) */}
              {!isAuthenticated && (
                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Entrar
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Search className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50
                           dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                           text-gray-700 dark:text-gray-300 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Ações extras no mobile menu */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 space-y-2">
                <button 
                  onClick={() => {
                    handlePhoneClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <Phone className="w-5 h-5" />
                  Contato de Emergência
                </button>
                
                <button 
                  onClick={() => {
                    handleUserClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated ? 'Minha Conta' : 'Entrar'}
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

        {/* Bottom Navigation (Mobile) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2 pb-safe">
          <div className="flex justify-around">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 
                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Modal de Contato */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Phone className="w-6 h-6 text-blue-600" />
                Contato de Emergência
              </h3>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-400 mb-1">Emergência Veterinária 24h</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">(71) 99999-9999</p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <p className="font-semibold text-blue-800 dark:text-blue-400 mb-1">Suporte PetFinder</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">contato@petfinder.com.br</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <p className="font-semibold text-green-800 dark:text-green-400 mb-1">Denúncias de Maus-tratos</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">0800-123-4567</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsContactModalOpen(false)}
              className="w-full mt-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}