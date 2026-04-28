import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-lg' },
    md: { container: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-xl' },
    lg: { container: 'w-14 h-14', icon: 'w-8 h-8', text: 'text-2xl' },
    xl: { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-3xl' },
  };

  const { container, icon, text } = sizes[size];

  const LogoContent = () => (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Ícone Pata */}
      <div className={`${container} bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg`}>
        <PawPrint className={`${icon} text-white`} />
      </div>
      
      {/* Texto PetFinder */}
      {showText && (
        <span className={`font-bold ${text} text-gray-900 dark:text-white`}>
          PetFinder
        </span>
      )}
    </div>
  );

  return showText ? (
    <Link to="/" className="hover:opacity-80 transition-opacity">
      <LogoContent />
    </Link>
  ) : (
    <LogoContent />
  );
}