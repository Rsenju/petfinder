import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginGoogle,
    logout,
    register,
    updateUser,
    forgotPassword,
    resetPassword,
  } = context;

  const handleLogin = useCallback(async (credentials) => {
    try {
      const userData = await login(credentials);
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Erro ao fazer login",
      };
    }
  }, [login]);

  const handleRegister = useCallback(async (userData) => {
    try {
      const newUser = await register(userData);
      return { success: true, user: newUser };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Erro ao cadastrar",
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
        error: error.message || "Erro ao sair",
      };
    }
  }, [logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isOng: user?.tipo === "ong" || user?.role === "ong",
    isAdmin: user?.tipo === "admin" || user?.role === "admin",
    login: handleLogin,
    loginGoogle,
    logout: handleLogout,
    register: handleRegister,
    updateUser,
    forgotPassword,
    resetPassword,
  };
}
