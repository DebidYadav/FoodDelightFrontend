import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../components/common/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search restaurants...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('updates input value when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search restaurants...');
    fireEvent.change(input, { target: { value: 'pizza' } });
    
    expect(input).toHaveValue('pizza');
  });

  test('calls onSearch when form is submitted', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search restaurants...');
    const submitButton = screen.getByRole('button', { name: 'Search' });
    
    fireEvent.change(input, { target: { value: 'pizza' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('pizza');
    });
  });

  test('calls onSearch with empty string when search term is empty', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const submitButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('');
    });
  });

  test('search input validation works correctly', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search restaurants...');
    
    // Test that input has correct placeholder
    expect(input).toHaveAttribute('placeholder', 'Search restaurants...');
    
    // Test that input has correct type
    expect(input).toHaveAttribute('type', 'text');
    
    // Test that input value updates correctly
    fireEvent.change(input, { target: { value: 'pizza' } });
    expect(input).toHaveValue('pizza');
  });

  test('search functionality works correctly', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search restaurants...');
    const submitButton = screen.getByRole('button', { name: 'Search' });
    
    fireEvent.change(input, { target: { value: 'pizza' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('pizza');
    });
  });
}); 