import { useState, useEffect } from 'react';

import type { Topic } from '../components/topic';

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

                const response = await fetch('http://localhost:3000/api/topics', { signal: controller.signal });

                if(!response.ok){
                    throw new Error(`Error fetching topics (HTTP ${response.status})`);
                }

                const data: Topic[] = await response.json();
                setTopics(data);

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

