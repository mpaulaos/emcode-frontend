import { useCallback, useState } from "react";
import { API_URL, apiFetch } from "../lib/api";

export function useChangePassword(token: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiFetch(`${API_URL}/api/auth/password`, {
        method: 'PATCH',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.status === 401) {
        throw new Error('La contraseña actual es incorrecta o la sesión expiró.');
      }

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        if (body?.errors && Array.isArray(body.errors)) {
          const msgs = body.errors.map((e: { message: string }) => e.message).join('; ');
          throw new Error(msgs);
        }
        throw new Error(body?.message ?? `Error al cambiar contraseña (HTTP ${response.status})`);
      }

      setSuccess(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error inesperado';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { changePassword, loading, error, success, setSuccess };
}
