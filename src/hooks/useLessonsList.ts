import { useEffect, useState } from 'react';
import type { Lesson } from '../types/lesson';
import { API_URL } from '../lib/api';

interface UseLessonsListDataResult {
    lessons: Lesson[];
    loading: boolean;
    error: string | null;
}

export function useLessonsListData(): UseLessonsListDataResult {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    
            const controller = new AbortController();
    
            async function fetchLessons () {
                try {
    
                    const response = await fetch(`${API_URL}/lessons`, { signal: controller.signal });
    
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
            
        }, []);
    
        return { lessons, loading, error };
}