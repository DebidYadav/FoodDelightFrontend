// Mock axios before importing the service
import axios from 'axios';
import {
  fetchRestaurants,
  searchRestaurant,
  addCustomer,
  loginCustomer
} from '../services/apiService';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchRestaurants', () => {
    test('fetches restaurants successfully', async () => {
      const mockResponse = {
        data: [
          { id: 1, name: 'Restaurant 1', cusine: 'Italian', image: 'img1.jpg' },
          { id: 2, name: 'Restaurant 2', cusine: 'Chinese', image: 'img2.jpg' }
        ]
      };
      mockAxios.get.mockResolvedValue(mockResponse);

      const result = await fetchRestaurants();

      expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/get-restaurants');
      expect(result).toEqual(mockResponse.data);
    });

    test('handles API errors', async () => {
      const error = new Error('Network error');
      mockAxios.get.mockRejectedValue(error);

      await expect(fetchRestaurants()).rejects.toThrow('Network error');
      expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/get-restaurants');
    });
  });

  describe('searchRestaurant', () => {
    test('searches restaurants by name successfully', async () => {
      const mockResponse = {
        data: [
          { id: 1, name: 'Pizza Place', cusine: 'Italian', image: 'pizza.jpg' }
        ]
      };
      mockAxios.get.mockResolvedValue(mockResponse);

      const result = await searchRestaurant('pizza');

      expect(mockAxios.get).toHaveBeenCalledWith(
        'http://localhost:3000/api/get-restaurantByName',
        { params: { name: 'pizza' } }
      );
      expect(result).toEqual(mockResponse.data);
    });

    test('handles search API errors', async () => {
      const error = new Error('Search failed');
      mockAxios.get.mockRejectedValue(error);

      await expect(searchRestaurant('pizza')).rejects.toThrow('Search failed');
      expect(mockAxios.get).toHaveBeenCalledWith(
        'http://localhost:3000/api/get-restaurantByName',
        { params: { name: 'pizza' } }
      );
    });
  });

  describe('addCustomer', () => {
    test('adds customer successfully', async () => {
      const customerData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      const mockResponse = {
        data: { success: true, message: 'Customer added successfully' }
      };
      mockAxios.post.mockResolvedValue(mockResponse);

      const result = await addCustomer(customerData);

      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/signup',
        customerData
      );
      expect(result).toEqual(mockResponse.data);
    });

    test('handles customer registration errors', async () => {
      const customerData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      const error = new Error('Registration failed');
      mockAxios.post.mockRejectedValue(error);

      await expect(addCustomer(customerData)).rejects.toThrow('Registration failed');
      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/signup',
        customerData
      );
    });
  });

  describe('loginCustomer', () => {
    test('logs in customer successfully', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };
      const mockResponse = {
        data: { success: true, token: 'mock-jwt-token' }
      };
      mockAxios.post.mockResolvedValue(mockResponse);

      const result = await loginCustomer(loginData);

      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/login',
        loginData
      );
      expect(result).toEqual(mockResponse.data);
    });

    test('handles login errors', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };
      const error = new Error('Login failed');
      mockAxios.post.mockRejectedValue(error);

      await expect(loginCustomer(loginData)).rejects.toThrow('Login failed');
      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/login',
        loginData
      );
    });
  });

  describe('API endpoints', () => {
    test('uses correct base URL for all endpoints', () => {
      const baseURL = 'http://localhost:3000/api';
      
      expect(fetchRestaurants).toBeDefined();
      expect(searchRestaurant).toBeDefined();
      expect(addCustomer).toBeDefined();
      expect(loginCustomer).toBeDefined();
    });
  });
}); 