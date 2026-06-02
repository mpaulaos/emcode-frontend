import { useState, useCallback } from 'react';
import type { User, LoginCredentials } from '../types/auth';
import { API_URL } from '../lib/api';

interface UseLoginResult {
  login: (credentials: LoginCredentials) => Promise<void>;
  loading: boolean;
  error: string | null;
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function useLogin(): UseLoginResult {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.message ?? `Error al iniciar sesión (HTTP ${response.status})`,
        );
      }
      
      const data = await response.json();
      const { token, user: loggedUser } = data;

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
      setUser(loggedUser);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setError(null);
  }, []);

  return {
    login,
    loading,
    error,
    user,
    isAuthenticated: user !== null,
    logout,
  };
}
