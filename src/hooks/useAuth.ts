import { useState } from 'react';
import { User, SignUpFormData, LoginFormData, AuthResponse } from '../types';
import { addCustomer, loginCustomer } from '../services/apiService';
import { handleApiError } from '../utils';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils';

const AUTH_TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getLocalStorage(USER_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!getLocalStorage(AUTH_TOKEN_KEY);

  const signUp = async (formData: SignUpFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      const response: AuthResponse = await addCustomer(payload);
      
      if (response.success) {
        setUser({ username: formData.username, email: formData.email });
        setLocalStorage(USER_KEY, { username: formData.username, email: formData.email });
        return true;
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData: LoginFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response: AuthResponse = await loginCustomer(formData);
      
      if (response.success && response.token) {
        setLocalStorage(AUTH_TOKEN_KEY, response.token);
        setUser({ username: '', email: formData.email });
        setLocalStorage(USER_KEY, { username: '', email: formData.email });
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    removeLocalStorage(AUTH_TOKEN_KEY);
    removeLocalStorage(USER_KEY);
    setUser(null);
    setError(null);
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signUp,
    login,
    logout,
    clearError,
  };
}; 