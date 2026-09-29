import { useCallback, useState } from "react";
import type { AuthResponse, ResetPasswordData } from "../types/auth";
import { API_URL } from "../lib/api";

interface UseResetPasswordResult {
  resetPassword: (data: ResetPasswordData) => Promise<AuthResponse | null>;
  loading: boolean;
  error: string | null;
}

export function useResetPassword(): UseResetPasswordResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = useCallback(async (data: ResetPasswordData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        if (body?.errors && Array.isArray(body.errors)) {
          const msgs = body.errors.map((e: { message: string }) => e.message).join('; ');
          throw new Error(msgs);
        }
        throw new Error(body?.message ?? `Error al restablecer la contraseña (HTTP ${response.status})`);
      }

      return (await response.json()) as AuthResponse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { resetPassword, loading, error };
}
