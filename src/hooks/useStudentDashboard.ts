import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Course } from '../types/dashboard';
import { API_URL } from '../lib/api';

interface StudentResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  courses: Course[];
  disabilities?: unknown[];
}

interface UseStudentDashboardResult {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export function useStudentDashboard(studentId: number): UseStudentDashboardResult {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudent() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/api/students/${studentId}`,
          {
            signal: controller.signal,
            headers: {
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          },
        );

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(
            body?.message ?? `Error al cargar los cursos (HTTP ${response.status})`,
          );
        }

        const json: StudentResponse = await response.json();
        setCourses(json.courses ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Error inesperado');
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
    return () => controller.abort();
  }, [studentId, token]);

  return { courses, loading, error };
}
