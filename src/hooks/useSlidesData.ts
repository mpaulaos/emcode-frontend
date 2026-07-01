import { useMemo } from 'react';
import { useFetch } from '../lib/useFetch';
import type { Slide } from '../types/slide';
import { API_URL } from '../lib/api';

interface UseSlidesDataResult {
    slides: Slide[];
    loading: boolean;
    error: string | null;
}

export function useSlidesData(lessonId: string | undefined): UseSlidesDataResult {
    const { data, loading, error } = useFetch<Slide[]>(
      lessonId ? `${API_URL}/api/slides/lesson/${lessonId}` : null
    );

    const slides = useMemo(() => data ?? [], [data]);

    return { slides, loading, error };
}
