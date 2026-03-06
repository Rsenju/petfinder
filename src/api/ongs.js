import apiClient from './client';

export const ongsApi = {
  // Listar todas as ONGs
  getAll: (params = {}) => {
    return apiClient.get('/ongs', { params });
  },

  // Buscar ONG por ID
  getById: (id) => {
    return apiClient.get(`/ongs/${id}`);
  },

  // Criar nova ONG
  create: (data) => {
    return apiClient.post('/ongs', data);
  },

  // Atualizar ONG
  update: (id, data) => {
    return apiClient.put(`/ongs/${id}`, data);
  },

  // Deletar ONG
  delete: (id) => {
    return apiClient.delete(`/ongs/${id}`);
  },

  // Buscar ONGs próximas (geolocalização)
  getNearby: (latitude, longitude, radius = 50) => {
    return apiClient.get('/ongs/nearby', {
      params: { latitude, longitude, radius },
    });
  },

  // Buscar ONGs por cidade/estado
  searchByLocation: (cidade, estado) => {
    return apiClient.get('/ongs/search', {
      params: { cidade, estado },
    });
  },

  // Upload de logo da ONG
  uploadLogo: (id, formData) => {
    return apiClient.post(`/ongs/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Estatísticas da ONG
  getStats: (id) => {
    return apiClient.get(`/ongs/${id}/stats`);
  },
};

export default ongsApi;