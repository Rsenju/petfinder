import apiClient from './client';

export const petsApi = {
  // Listar todos os pets
  getAll: (params = {}) => {
    return apiClient.get('/pets', { params });
  },

  // Buscar pet por ID
  getById: (id) => {
    return apiClient.get(`/pets/${id}`);
  },

  // Criar novo pet
  create: (data) => {
    return apiClient.post('/pets', data);
  },

  // Atualizar pet
  update: (id, data) => {
    return apiClient.put(`/pets/${id}`, data);
  },

  // Deletar pet
  delete: (id) => {
    return apiClient.delete(`/pets/${id}`);
  },

  // Busca avançada
  search: (query, filters = {}) => {
    return apiClient.get('/pets/search', {
      params: { q: query, ...filters },
    });
  },

  // Favoritar/desfavoritar pet
  toggleFavorite: (id) => {
    return apiClient.post(`/pets/${id}/favorite`);
  },

  // Listar favoritos do usuário
  getFavorites: () => {
    return apiClient.get('/pets/favorites');
  },

  // Upload de fotos do pet
  uploadPhotos: (id, formData) => {
    return apiClient.post(`/pets/${id}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Pets por ONG
  getByOng: (ongId) => {
    return apiClient.get(`/ongs/${ongId}/pets`);
  },

  // Pets similares
  getSimilar: (id) => {
    return apiClient.get(`/pets/${id}/similar`);
  },
};

export default petsApi;