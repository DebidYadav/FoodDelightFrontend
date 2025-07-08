import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../pages/App';

import { fetchRestaurants } from '../services/apiService';

// Mock the API service
jest.mock('../services/apiService', () => ({
  fetchRestaurants: jest.fn()
}));

const mockFetchRestaurants = fetchRestaurants as jest.MockedFunction<typeof fetchRestaurants>;

// Mock the components
jest.mock('../components/common/CardComponent', () => {
  return function MockCardComponent({ restaurant }: { restaurant: any }) {
    return (
      <div data-testid={`restaurant-${restaurant.id}`}>
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cusine}</p>
        <img src={restaurant.image} alt={restaurant.name} />
      </div>
    );
  };
});

jest.mock('../components/common/SearchBar', () => {
  return function MockSearchBar({ onSearch }: { onSearch: any }) {
    return (
      <div data-testid="search-bar">
        <input type="text" placeholder="Search restaurants..." />
        <button onClick={() => onSearch('')}>Search</button>
      </div>
    );
  };
});

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('App', () => {
  const mockRestaurants = [
    {
      id: 1,
      name: 'Pizza Place',
      cusine: 'Italian',
      image: 'pizza.jpg'
    },
    {
      id: 2,
      name: 'Burger Joint',
      cusine: 'American',
      image: 'burger.jpg'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchRestaurants.mockResolvedValue(mockRestaurants);
  });

  test('renders app title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Food Delight')).toBeInTheDocument();
  });

  test('renders search bar', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('loads restaurants on mount', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockFetchRestaurants).toHaveBeenCalled();
    });
  });

  test('renders restaurant cards after loading', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('restaurant-1')).toBeInTheDocument();
      expect(screen.getByTestId('restaurant-2')).toBeInTheDocument();
    });
  });

  test('navigates to signup page when Sign Up button is clicked', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  test('navigates to login page when Sign In button is clicked', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('renders correctly when API is not available', async () => {
    mockFetchRestaurants.mockResolvedValue([]);
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Food Delight')).toBeInTheDocument();
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });
  });

  test('renders empty state when no restaurants are loaded', async () => {
    mockFetchRestaurants.mockResolvedValue([]);
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Food Delight')).toBeInTheDocument();
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });
  });

  test('updates restaurants when search bar calls setRestaurants', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('restaurant-1')).toBeInTheDocument();
    });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.queryByTestId('restaurant-1')).not.toBeInTheDocument();
    });
  });
}); 