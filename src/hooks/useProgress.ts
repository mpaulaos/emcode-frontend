import { useState, useEffect, useCallback } from 'react';
import type { CourseProgress, StudentProgressRecord, QuizSubmissionAnswer, QuizResult, LastQuizAttempt } from '../types/progress';
import { API_URL, apiFetch } from '../lib/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? `Error en la solicitud (HTTP ${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

export function useCourseProgress(courseId: string | undefined) {
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/progress/courses/${courseId}`);
      const data = await handleResponse<CourseProgress>(response);
      setProgress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
}

export function useAllProgress() {
  const [records, setRecords] = useState<StudentProgressRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAll() {
      setLoading(true);
      try {
        const response = await apiFetch(`${API_URL}/api/progress`, {
          signal: controller.signal,
        });
        const data = await handleResponse<StudentProgressRecord[]>(response);
        setRecords(data);
        setError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Error inesperado');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchAll();
    return () => controller.abort();
  }, []);

  return { records, loading, error };
}

export async function markLessonComplete(lessonId: number): Promise<StudentProgressRecord> {
  const response = await apiFetch(`${API_URL}/api/progress/lessons/${lessonId}`, {
    method: 'POST',
  });
  return handleResponse<StudentProgressRecord>(response);
}

export async function getLastQuizAttempt(
  lessonId: number,
): Promise<LastQuizAttempt | null> {
  const response = await apiFetch(`${API_URL}/api/progress/lessons/${lessonId}/quiz/last`);
  if (response.status === 404) return null;
  return handleResponse<LastQuizAttempt>(response);
}

export async function submitQuiz(
  lessonId: number,
  answers: QuizSubmissionAnswer[],
): Promise<QuizResult> {
  const response = await apiFetch(`${API_URL}/api/progress/lessons/${lessonId}/quiz`, {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });
  return handleResponse<QuizResult>(response);
}
