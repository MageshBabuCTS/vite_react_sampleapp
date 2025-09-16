import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';
import * as auth from '../utils/auth';
import { useNavigate } from "react-router";

// src/components/Login.test.js

jest.mock('../utils/auth');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('Login component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test('renders input fields and login button', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('updates username and password fields', () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });

  test('calls login and navigates on successful login', async () => {
    auth.login.mockResolvedValueOnce({});
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'pass' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(auth.login).toHaveBeenCalledWith('user', 'pass');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  test('shows error message on failed login', async () => {
    auth.login.mockRejectedValueOnce(new Error('Invalid credentials'));
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrong' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(auth.login).toHaveBeenCalledWith('user', 'wrong');
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('clears error message on new submit', async () => {
    auth.login.mockRejectedValueOnce(new Error('Invalid credentials'));
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    auth.login.mockResolvedValueOnce({});
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'right' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});