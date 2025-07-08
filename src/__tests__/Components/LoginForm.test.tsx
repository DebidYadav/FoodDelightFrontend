import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';

import { loginCustomer } from '../../services/apiService';

// Mock the API service
jest.mock('../../services/apiService', () => ({
  loginCustomer: jest.fn()
}));

const mockLoginCustomer = loginCustomer as jest.MockedFunction<typeof loginCustomer>;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form fields', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('updates form fields when typing', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('submits form with correct data', async () => {
    const mockResponse = { success: true, token: 'mock-token' };
    mockLoginCustomer.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginCustomer).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('submits form even with empty fields (browser validation)', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginCustomer).not.toHaveBeenCalled();
    });
  });

  test('form validation works correctly', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    // Test that all required fields are present
    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
    
    // Test that email field has correct type
    expect(emailInput).toHaveAttribute('type', 'email');
    
    // Test that password field has correct type
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('form submission calls API with correct data', async () => {
    mockLoginCustomer.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginCustomer).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('form fields have required attribute', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('Email:')).toHaveAttribute('required');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('required');
  });

  test('email field has correct type', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('Email:')).toHaveAttribute('type', 'email');
  });

  test('password field has correct type', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('Password:')).toHaveAttribute('type', 'password');
  });

  test('logs form data to console on submission', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    mockLoginCustomer.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Login successful');
    });

    consoleSpy.mockRestore();
  });
}); 