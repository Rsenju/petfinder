import { useState, useEffect, useCallback } from 'react';
import { petsApi } from '../api/pets';

export function usePets(options = {}) {
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(options.initialFilters || {});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const fetchPets = useCallback(async (customFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await petsApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
        ...customFilters,
      });
      
      setPets(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.total,
        totalPages: response.data.totalPages,
      }));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar pets');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  const fetchPetById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await petsApi.getById(id);
      setPet(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar pet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPet = useCallback(async (petData) => {
    setLoading(true);
    try {
      const response = await petsApi.create(petData);
      setPets(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar pet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePet = useCallback(async (id, petData) => {
    setLoading(true);
    try {
      const response = await petsApi.update(id, petData);
      setPets(prev => prev.map(p => p.id === id ? response.data : p));
      if (pet?.id === id) setPet(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar pet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pet]);

  const deletePet = useCallback(async (id) => {
    setLoading(true);
    try {
      await petsApi.delete(id);
      setPets(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao deletar pet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback(async (id) => {
    try {
      const response = await petsApi.toggleFavorite(id);
      setPets(prev => prev.map(p => 
        p.id === id ? { ...p, isFavorited: response.data.isFavorited } : p
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao favoritar pet');
      throw err;
    }
  }, []);

  const searchPets = useCallback(async (searchQuery, searchFilters = {}) => {
    setLoading(true);
    try {
      const response = await petsApi.search(searchQuery, searchFilters);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro na busca');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  useEffect(() => {
    if (options.autoFetch) {
      fetchPets();
    }
  }, [options.autoFetch, fetchPets]);

  return {
    pets,
    pet,
    loading,
    error,
    filters,
    pagination,
    setPage: (page) => setPagination(prev => ({ ...prev, page })),
    setFilters: updateFilters,
    clearFilters,
    fetchPets,
    fetchPetById,
    createPet,
    updatePet,
    deletePet,
    toggleFavorite,
    searchPets,
    refresh: fetchPets,
  };
}