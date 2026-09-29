import { useCallback, useState } from "react";
import { API_URL, apiFetch } from "../lib/api";
import { getApiErrorMessage, getFriendlyErrorMessage } from "../lib/friendlyErrors";

export function useChangePassword(_token: string | null) {
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
        throw new Error(getApiErrorMessage(body, response.status, 'No pudimos cambiar tu contraseña. Inténtalo de nuevo.'));
      }

      setSuccess(true);
      return true;
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos cambiar tu contraseña. Inténtalo de nuevo.');
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { changePassword, loading, error, success, setSuccess };
}
