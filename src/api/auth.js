import apiClient from './client';

export const authApi = {
  // Login
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  // Registro
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  // Logout
  logout: () => {
    return apiClient.post('/auth/logout');
  },

  // Dados do usuário logado
  getMe: () => {
    return apiClient.get('/auth/me');
  },

  // Atualizar perfil
  updateProfile: (data) => {
    return apiClient.put('/auth/profile', data);
  },

  // Esqueci minha senha
  forgotPassword: (email) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  // Resetar senha
  resetPassword: (token, newPassword) => {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },

  // Verificar email
  verifyEmail: (token) => {
    return apiClient.get(`/auth/verify-email?token=${token}`);
  },

  // Reenviar email de verificação
  resendVerification: (email) => {
    return apiClient.post('/auth/resend-verification', { email });
  },

  // Login social (Google, Facebook, etc)
  socialLogin: (provider, token) => {
    return apiClient.post(`/auth/social/${provider}`, { token });
  },
};

export default authApi;