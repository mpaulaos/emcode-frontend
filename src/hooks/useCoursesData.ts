import { useMemo } from 'react';
import { useFetch } from '../lib/useFetch';
import type { ExploreCourse } from '../types/explore';
import { API_URL } from '../lib/api';

interface UseCoursesDataResult {
  courses: ExploreCourse[];
  loading: boolean;
  error: string | null;
}

export function useCoursesData(): UseCoursesDataResult {
  const { data, loading, error } = useFetch<ExploreCourse[]>(
    `${API_URL}/api/courses`
  );

  const courses = useMemo(() => data ?? [], [data]);

  return { courses, loading, error };
}
