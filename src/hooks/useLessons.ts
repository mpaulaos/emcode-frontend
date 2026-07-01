import { useState } from 'react';
import type { Lesson } from '../types/lesson';
import { API_URL, apiFetch } from '../lib/api';

interface CreateLessonInput {
  lessonName: string;
  lessonType?: 'theory' | 'practice';
  isVisible?: boolean;
}

interface UpdateLessonInput {
  lessonName?: string;
  lessonType?: 'theory' | 'practice';
  isVisible?: boolean;
}

interface UseLessonsResult {
  createLesson: (topicId: string, input: CreateLessonInput) => Promise<Lesson>;
  updateLesson: (lessonId: number, input: UpdateLessonInput) => Promise<Lesson>;
  deleteLesson: (lessonId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useLessons(): UseLessonsResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message ?? `Error en la solicitud (HTTP ${response.status})`);
    }
    if (response.status === 204) return undefined as T;
    return response.json();
  }

  async function createLesson(topicId: string, input: CreateLessonInput): Promise<Lesson> {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/lessons/topic/${topicId}`, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      return await handleResponse<Lesson>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateLesson(lessonId: number, input: UpdateLessonInput): Promise<Lesson> {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/lessons/${lessonId}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
      });
      return await handleResponse<Lesson>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteLesson(lessonId: number): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/lessons/${lessonId}`, {
        method: 'DELETE',
      });
      return await handleResponse<void>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { createLesson, updateLesson, deleteLesson, loading, error };
}
