import { useState, useEffect, useCallback } from 'react';
import type { CourseProgress, StudentProgressRecord, QuizSubmissionAnswer, QuizResult, LastQuizAttempt } from '../types/progress';
import { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';

function authHeaders(token: string | null) {
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

export function useCourseProgress(courseId: string | undefined) {
  const { token } = useAuth();
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!courseId || !token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/progress/courses/${courseId}`, {
        headers: authHeaders(token),
      });
      const data = await handleResponse<CourseProgress>(response);
      setProgress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }, [courseId, token]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
}

export function useAllProgress() {
  const { token } = useAuth();
  const [records, setRecords] = useState<StudentProgressRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();

    async function fetchAll() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/progress`, {
          headers: authHeaders(token),
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
  }, [token]);

  return { records, loading, error };
}

export async function markLessonComplete(lessonId: number, token: string | null): Promise<StudentProgressRecord> {
  const response = await fetch(`${API_URL}/api/progress/lessons/${lessonId}`, {
    method: 'POST',
    headers: authHeaders(token),
  });
  return handleResponse<StudentProgressRecord>(response);
}

export async function getLastQuizAttempt(
  lessonId: number,
  token: string | null,
): Promise<LastQuizAttempt | null> {
  const response = await fetch(`${API_URL}/api/progress/lessons/${lessonId}/quiz/last`, {
    headers: authHeaders(token),
  });
  if (response.status === 404) return null;
  return handleResponse<LastQuizAttempt>(response);
}

export async function submitQuiz(
  lessonId: number,
  answers: QuizSubmissionAnswer[],
  token: string | null,
): Promise<QuizResult> {
  const response = await fetch(`${API_URL}/api/progress/lessons/${lessonId}/quiz`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ answers }),
  });
  return handleResponse<QuizResult>(response);
}
