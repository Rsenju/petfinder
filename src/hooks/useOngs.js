import { useState, useEffect, useCallback } from 'react';
import { ongsApi } from '../api/ongs';

export function useOngs(options = {}) {
  const [ongs, setOngs] = useState([]);
  const [ong, setOng] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchOngs = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ongsApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      });
      
      setOngs(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.total,
        totalPages: response.data.totalPages,
      }));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar ONGs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  const fetchOngById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ongsApi.getById(id);
      setOng(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar ONG');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createOng = useCallback(async (ongData) => {
    setLoading(true);
    try {
      const response = await ongsApi.create(ongData);
      setOngs(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar ONG');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOng = useCallback(async (id, ongData) => {
    setLoading(true);
    try {
      const response = await ongsApi.update(id, ongData);
      setOngs(prev => prev.map(o => o.id === id ? response.data : o));
      if (ong?.id === id) setOng(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar ONG');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [ong]);

  const deleteOng = useCallback(async (id) => {
    setLoading(true);
    try {
      await ongsApi.delete(id);
      setOngs(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao deletar ONG');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchOngsByLocation = useCallback(async (latitude, longitude, radius = 50) => {
    setLoading(true);
    try {
      const response = await ongsApi.getNearby(latitude, longitude, radius);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar ONGs próximas');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (options.autoFetch) {
      fetchOngs(options.filters);
    }
  }, [options.autoFetch, options.filters, fetchOngs]);

  return {
    ongs,
    ong,
    loading,
    error,
    pagination,
    setPage: (page) => setPagination(prev => ({ ...prev, page })),
    fetchOngs,
    fetchOngById,
    createOng,
    updateOng,
    deleteOng,
    searchOngsByLocation,
    refresh: fetchOngs,
  };
}