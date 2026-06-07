import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  loginWithGoogle,
  loginWithCredentials,
  logoutUser,
  onAuthStateChange,
  registerOngAccount,
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
        localStorage.removeItem('petfinder:auth_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const subscription = onAuthStateChange((nextUser) => {
      setUser(nextUser);
      setIsAuthenticated(Boolean(nextUser));
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (credentials) => {
    const userData = await loginWithCredentials(credentials);
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  }, []);

  const register = useCallback(async (userData) => {
    const newUser = await registerOngAccount(userData);
    setUser(newUser);
    setIsAuthenticated(Boolean(newUser));
    return newUser;
  }, []);

  const loginGoogle = useCallback(async () => {
    await loginWithGoogle();
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('petfinder:auth_user');
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

  const forgotPassword = useCallback(async () => {
    return null;
  }, []);

  const resetPassword = useCallback(async () => {
    return null;
  }, []);

  const value = {
    user,
    isAuthenticated: isAuthenticated || !!user,
    isLoading,
    login,
    loginGoogle,
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
