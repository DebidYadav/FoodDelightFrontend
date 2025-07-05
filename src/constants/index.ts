// API Endpoints
export const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  RESTAURANTS: `${API_BASE_URL}/get-restaurants`,
  SEARCH_RESTAURANT: `${API_BASE_URL}/get-restaurantByName`,
  SIGNUP: `${API_BASE_URL}/signup`,
  LOGIN: `${API_BASE_URL}/login`,
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'Food Delight',
  DESCRIPTION: 'Discover the best restaurants in your area',
  VERSION: '1.0.0',
} as const;

// Form Validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_USERNAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 100,
} as const;

// UI Constants
export const UI = {
  GRID_COLUMNS: 4,
  CARD_GAP: '8px',
  IMAGE_HEIGHT: 300,
  IMAGE_WIDTH: 300,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  SEARCH_FAILED: 'Search failed. Please try again.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
} as const; 