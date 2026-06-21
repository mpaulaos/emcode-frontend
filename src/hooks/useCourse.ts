import { useFetch } from '../lib/useFetch';
import type { Course } from '../types/dashboard';
import { API_URL } from '../lib/api';

interface UseCourseResult {
  course:   Course | null;
  loading:  boolean;
  error:    string | null;
  notFound: boolean;
}

export function useCourse(id: string | undefined): UseCourseResult {
  const { data: course, loading, error, status } = useFetch<Course>(
    id ? `${API_URL}/dashboard/courses/${id}` : null
  );

  return { course, loading, error, notFound: status === 404 };
}