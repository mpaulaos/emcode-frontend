import { useCallback, useState } from "react";
import type { User, UpdateProfileData } from "../types/auth";
import { API_URL, apiFetch } from "../lib/api";
import { getApiErrorMessage, getFriendlyErrorMessage } from "../lib/friendlyErrors";

interface UpdateProfileResponse {
  user: User;
  token: string;
}

export function useUpdateProfile(_token: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(`${API_URL}/api/auth/profile`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(getApiErrorMessage(body, response.status, 'No pudimos actualizar tu perfil. Inténtalo de nuevo.'));
      }

      const result: UpdateProfileResponse = await response.json();
      return result;
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos actualizar tu perfil. Inténtalo de nuevo.');
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateProfile, loading, error };
}
