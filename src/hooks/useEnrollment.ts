import { useCallback, useState } from 'react';
import { API_URL, apiFetch } from '../lib/api';

interface UseEnrollmentResult {
  enroll: (courseId: number, studentId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useEnrollment(): UseEnrollmentResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enroll = useCallback(async (courseId: number, studentId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(`${API_URL}/api/courses/${courseId}/students`, {
        method: 'POST',
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
  }, []);

  return { enroll, loading, error };
}
