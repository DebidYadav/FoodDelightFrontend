import { useState, useEffect } from 'react';
import { Restaurant } from '../types';
import { fetchRestaurants, searchRestaurant } from '../services/apiService';
import { handleApiError } from '../utils';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRestaurants = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchRestaurants();
      setRestaurants(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const searchRestaurants = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      await loadRestaurants();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await searchRestaurant(searchTerm);
      setRestaurants(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return {
    restaurants,
    loading,
    error,
    loadRestaurants,
    searchRestaurants,
  };
}; 