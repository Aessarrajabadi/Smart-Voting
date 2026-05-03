import { useState, useCallback } from 'react';
import API from '../api/axios';

/**
 * Custom hook for handling API calls with loading and error states.
 */
export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Something went wrong';
      setError(msg);
      throw msg;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, loading, error, execute, setData, setError };
};

/**
 * Pre-configured hook for cached POST requests.
 */
export const useCachedPost = () => {
  return useApi((url, body) => API.cachedPost(url, body));
};
