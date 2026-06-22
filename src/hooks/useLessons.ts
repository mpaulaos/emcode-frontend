import { useState } from 'react';
import type { Lesson } from '../types/lesson';
import { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';

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
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function authHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

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
      const response = await fetch(`${API_URL}/api/lessons/topic/${topicId}`, {
        method: 'POST',
        headers: authHeaders(),
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
      const response = await fetch(`${API_URL}/api/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: authHeaders(),
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
      const response = await fetch(`${API_URL}/api/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: authHeaders(),
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