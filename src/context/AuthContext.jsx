import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  loginWithCredentials,
  logoutUser,
  updateCurrentUser,
} from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
        console.error('Erro ao restaurar sessao:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    const userData = await loginWithCredentials(credentials);
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  }, []);

  const register = useCallback(async (userData) => {
    const newUser = await loginWithCredentials(userData);
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const updateUser = useCallback(async (userData) => {
    const updated = await updateCurrentUser(userData);
    setUser(updated);
    return updated;
  }, []);

  const forgotPassword = useCallback(async (email) => {
    console.info(`Fluxo de recuperacao solicitado para ${email}`);
  }, []);

  const resetPassword = useCallback(async (token, newPassword) => {
    console.info('Fluxo de redefinicao local solicitado', token, newPassword);
  }, []);

  const value = {
    user,
    isAuthenticated: isAuthenticated || !!user,
    isLoading,
    login,
    logout,
    register,
    updateUser,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
