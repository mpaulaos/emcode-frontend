import { useCallback, useState } from "react";
import type { ForgotPasswordData } from "../types/auth";
import { API_URL } from "../lib/api";

interface UseForgotPasswordResult {
  forgotPassword: (data: ForgotPasswordData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useForgotPassword(): UseForgotPasswordResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPassword = useCallback(async (data: ForgotPasswordData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
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
        throw new Error(body?.message ?? `Error al solicitar el restablecimiento (HTTP ${response.status})`);
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { forgotPassword, loading, error };
}
