import { useCallback, useState } from 'react';
import { API_URL, apiFetch } from '../lib/api';
import { getApiErrorMessage, getFriendlyErrorMessage } from '../lib/friendlyErrors';

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
          getApiErrorMessage(body, response.status, 'No pudimos matricularte en el curso. Inténtalo de nuevo.'),
        );
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const message = getFriendlyErrorMessage(err, 'No pudimos matricularte en el curso. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { enroll, loading, error };
}
