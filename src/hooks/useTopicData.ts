import { useState, useEffect } from 'react';
import type { Topic } from '../types/topic';
import { API_URL } from '../lib/api';

interface UseTopicDataResult {
    topics: Topic[];
    loading: boolean;
    error: string | null;
}

export function useTopicData(): UseTopicDataResult {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const controller = new AbortController();

        async function fetchTopics () {
            try {

                const response = await fetch(`${API_URL}/topics`, { signal: controller.signal });

                if(!response.ok){
                    throw new Error(`Error fetching topics (HTTP ${response.status})`);
                }

                const data: Topic[] = await response.json();
                setTopics(data);

                console.log(data);

            } catch (err) {

                if(err instanceof DOMException && err.name === 'AbortError') return;

                setError(err instanceof Error ? err.message : 'An unexpected error occurred');

            } finally {
                setLoading(false);
            }
        }

        fetchTopics();

        return () => controller.abort();
        
    }, []);

    return { topics, loading, error };
}

