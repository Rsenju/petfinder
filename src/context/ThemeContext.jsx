import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Sempre começa claro no servidor
  const [mounted, setMounted] = useState(false);

  // Inicialização - só roda no cliente
  useEffect(() => {
    // Verifica se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Se tiver salvo, usa. Se não, mantém 'light' (não verifica sistema!)
    if (savedTheme) {
      setTheme(savedTheme);
    }
    // Se não tiver nada salvo, permanece 'light' (padrão)
    
    setMounted(true);
  }, []);

  // Aplica a classe no elemento HTML
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // Remove ambas as classes
    root.classList.remove('light', 'dark');
    
    // Adiciona apenas a classe atual
    root.classList.add(theme);
    
    // Salva no localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;