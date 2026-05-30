import { useState, useEffect } from 'react';
import type { Course } from '../components/dashboardData';

interface UseCourseResult {
  course:   Course | null;
  loading:  boolean;
  error:    string | null;
  notFound: boolean;
}

export function useCourse(id: string | undefined): UseCourseResult {
  const [course,   setCourse]   = useState<Course | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchCourse() {
      try {
        const response = await fetch(
          `http://localhost:3000/dashboard/courses/${id}`,
          { signal: controller.signal }
        );

        // 404 va aquí — antes del !response.ok (Mensaje para curso no encontrado )
        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`Error al cargar el curso (HTTP ${response.status})`);
        }

        const json: Course = await response.json();
        setCourse(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Error inesperado');
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
    return () => controller.abort();
  }, [id]);

  return { course, loading, error, notFound };
}