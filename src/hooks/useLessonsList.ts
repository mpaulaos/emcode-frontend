import { useEffect, useState } from 'react';
import type { Lesson } from '../types/lesson';
import { API_URL } from '../lib/api';

interface UseLessonsListDataResult {
    lessons: Lesson[];
    loading: boolean;
    error: string | null;
}

export function useLessonsListData(id: string | undefined): UseLessonsListDataResult {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!id) {
            setLoading(false);
            return;
        }
    
            const controller = new AbortController();
    
            async function fetchLessons () {
                try {
                    console.log(`Fetching: ${API_URL}/api/lessons/topic/${id}`);
                    const response = await fetch(`${API_URL}/api/lessons/topic/${id}`, { signal: controller.signal });
    
                    if(!response.ok){
                        throw new Error(`Error fetching topics (HTTP ${response.status})`);
                    }
    
                    const data: Lesson[] = await response.json();
                    setLessons(data);
    
                    console.log(data);
    
                } catch (err) {
    
                    if(err instanceof DOMException && err.name === 'AbortError') return;
    
                    setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    
                } finally {
                    setLoading(false);
                }
            }
    
            fetchLessons();
    
            return () => controller.abort();
            
        }, [id]);
    
        return { lessons, loading, error };
}