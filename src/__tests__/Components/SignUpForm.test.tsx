import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SignUpForm from '../../components/forms/SignUpForm';

import { addCustomer } from '../../services/apiService';

// Mock the API service
jest.mock('../../services/apiService', () => ({
  addCustomer: jest.fn()
}));

const mockAddCustomer = addCustomer as jest.MockedFunction<typeof addCustomer>;

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields', () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('updates form fields when typing', () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  test('submits form with correct data', async () => {
    const mockResponse = { success: true };
    mockAddCustomer.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddCustomer).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
    });
  });

  test('submits form even with empty fields (browser validation)', async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddCustomer).not.toHaveBeenCalled();
    });
  });

  test('form validation works correctly', async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    
    // Test that all required fields are present
    expect(usernameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
    expect(confirmPasswordInput).toHaveAttribute('required');
    
    // Test that email field has correct type
    expect(emailInput).toHaveAttribute('type', 'email');
    
    // Test that password fields have correct type
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  test('form submission calls API with correct data', async () => {
    mockAddCustomer.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddCustomer).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
    });
  });

  test('form fields have required attribute', () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('Username:')).toHaveAttribute('required');
    expect(screen.getByLabelText('Email:')).toHaveAttribute('required');
    expect(screen.getByLabelText('Password:')).toHaveAttribute('required');
    expect(screen.getByLabelText('Confirm Password:')).toHaveAttribute('required');
  });

  test('email field has correct type', () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('Email:')).toHaveAttribute('type', 'email');
  });

  test('password fields have correct type', () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('Password:')).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('Confirm Password:')).toHaveAttribute('type', 'password');
  });
}); 