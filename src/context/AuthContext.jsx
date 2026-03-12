import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await authApi.getMe();
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await authApi.login(credentials);
    const { user: userData, token } = response.data;
    
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
    
    return userData;
  }, []);

  const register = useCallback(async (userData) => {
    const response = await authApi.register(userData);
    const { user: newUser, token } = response.data;
    
    localStorage.setItem('token', token);
    setUser(newUser);
    setIsAuthenticated(true);
    
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const updateUser = useCallback(async (userData) => {
    const response = await authApi.updateProfile(userData);
    setUser(response.data);
    return response.data;
  }, []);

  const forgotPassword = useCallback(async (email) => {
    await authApi.forgotPassword(email);
  }, []);

  const resetPassword = useCallback(async (token, newPassword) => {
    await authApi.resetPassword(token, newPassword);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user, 
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

