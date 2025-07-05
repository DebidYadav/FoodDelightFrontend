import axios from 'axios';
import { API_ENDPOINTS } from '../constants';
import { Restaurant, SignUpFormData, LoginFormData, AuthResponse } from '../types';

// Fetch restaurants
export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get(API_ENDPOINTS.RESTAURANTS);
  return response.data;
};

// Search restaurant based on name
export const searchRestaurant = async (searchTerm: string): Promise<Restaurant[]> => {
  const response = await axios.get(API_ENDPOINTS.SEARCH_RESTAURANT, {
    params: { name: searchTerm }
  });
  return response.data;
};

// Add a new customer to the database
export const addCustomer = async (formData: SignUpFormData): Promise<AuthResponse> => {
  const response = await axios.post(API_ENDPOINTS.SIGNUP, formData);
  return response.data;
};

// Login a customer
export const loginCustomer = async (formData: LoginFormData): Promise<AuthResponse> => {
  const response = await axios.post(API_ENDPOINTS.LOGIN, formData);
  return response.data;
};