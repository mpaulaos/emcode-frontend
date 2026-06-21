import { useFetch } from '../lib/useFetch';
import type { Topic } from '../types/topic';
import { API_URL } from '../lib/api';

interface UseTopicDataResult {
    topics: Topic[];
    loading: boolean;
    error: string | null;
}

export function useTopicData(id: string | undefined): UseTopicDataResult {
    const { data, loading, error } = useFetch<Topic[]>(
      id ? `${API_URL}/api/topics/course/${id}` : null
    );

    return { topics: data ?? [], loading, error };
}

