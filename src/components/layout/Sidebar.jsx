import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Heart, 
  MessageCircle, 
  User, 
  Settings,
  HelpCircle
} from 'lucide-react';

const defaultNavItems = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/search', label: 'Buscar', icon: Search },
  { path: '/favorites', label: 'Favoritos', icon: Heart },
  { path: '/messages', label: 'Mensagens', icon: MessageCircle },
];

const bottomNavItems = [
  { path: '/profile', label: 'Perfil', icon: User },
  { path: '/settings', label: 'Configurações', icon: Settings },
  { path: '/help', label: 'Ajuda', icon: HelpCircle },
];

export function Sidebar({ 
  className = '', 
  customNavItems,
  ongMode = false 
}) {
  const navItems = customNavItems || defaultNavItems;

  return (
    <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 ${className}`}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          🐾 PetFinder
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}