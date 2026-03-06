import { useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext'; // ✅ CORRIGIDO

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    register,
    updateUser,
    forgotPassword,
    resetPassword
  } = context;

  const handleLogin = useCallback(async (credentials) => {
    try {
      await login(credentials);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Erro ao fazer login' 
      };
    }
  }, [login]);

  const handleRegister = useCallback(async (userData) => {
    try {
      await register(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Erro ao cadastrar' 
      };
    }
  }, [register]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Erro ao sair' 
      };
    }
  }, [logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isOng: user?.tipo === 'ong',
    isAdmin: user?.tipo === 'admin',
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    updateUser,
    forgotPassword,
    resetPassword,
  };
}