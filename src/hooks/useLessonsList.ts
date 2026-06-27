import { useMemo } from 'react';
import { useFetch } from '../lib/useFetch';
import type { Lesson } from '../types/lesson';
import { API_URL } from '../lib/api';

interface UseLessonsListDataResult {
    lessons: Lesson[];
    loading: boolean;
    error: string | null;
}

export function useLessonsListData(id: string | undefined): UseLessonsListDataResult {
    const { data, loading, error } = useFetch<Lesson[]>(
      id ? `${API_URL}/api/lessons/topic/${id}` : null
    );

    const lessons = useMemo(() => data ?? [], [data]);

    return { lessons, loading, error };
}