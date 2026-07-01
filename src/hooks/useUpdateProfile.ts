import { useCallback, useState } from "react";
import type { User, UpdateProfileData } from "../types/auth";
import { API_URL, apiFetch } from "../lib/api";

interface UpdateProfileResponse {
  user: User;
  token: string;
}

export function useUpdateProfile(token: string | null) {
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
        if (body?.errors && Array.isArray(body.errors)) {
          const msgs = body.errors.map((e: { message: string }) => e.message).join('; ');
          throw new Error(msgs);
        }
        throw new Error(body?.message ?? `Error al actualizar perfil (HTTP ${response.status})`);
      }

      const result: UpdateProfileResponse = await response.json();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error inesperado';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateProfile, loading, error };
}
