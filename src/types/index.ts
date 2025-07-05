// Restaurant types
export interface Restaurant {
  id: number;
  name: string;
  cusine: string;
  image: string;
}

// User types
export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

// Form types
export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

// Component Props types
export interface CardComponentProps {
  restaurant: Restaurant;
}

export interface SearchBarProps {
  setRestaurants: (restaurants: Restaurant[]) => void;
}

export interface RestaurantListProps {
  restaurants: Restaurant[];
}

// Navigation types
export interface NavigationProps {
  onSignUp: () => void;
  onLogin: () => void;
} 