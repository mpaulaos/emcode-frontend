import { useCallback, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../lib/api';

interface UseEnrollmentResult {
  enroll: (courseId: number, studentId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useEnrollment(): UseEnrollmentResult {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enroll = useCallback(async (courseId: number, studentId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/courses/${courseId}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ studentId }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.message ?? `Error al matricularte en el curso (HTTP ${response.status})`,
        );
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const message = err instanceof Error ? err.message : 'Error inesperado';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { enroll, loading, error };
}
