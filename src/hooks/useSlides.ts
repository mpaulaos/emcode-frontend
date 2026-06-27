import { useState } from 'react';
import type { Slide, CreateSlideInput, UpdateSlideInput } from '../types/slide';
import { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface UseSlidesResult {
  fetchSlidesByLesson: (lessonId: number) => Promise<Slide[]>;
  getSlideById: (id: number) => Promise<Slide>;
  createSlide: (lessonId: number, input: CreateSlideInput) => Promise<Slide>;
  createSlidesBatch: (lessonId: number, slides: CreateSlideInput[]) => Promise<Slide[]>;
  updateSlide: (id: number, input: UpdateSlideInput) => Promise<Slide>;
  deleteSlide: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useSlides(): UseSlidesResult {
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

  async function fetchSlidesByLesson(lessonId: number): Promise<Slide[]> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/slides/lesson/${lessonId}`, {
        headers: authHeaders(),
      });
      return await handleResponse<Slide[]>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function getSlideById(id: number): Promise<Slide> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/slides/${id}`, {
        headers: authHeaders(),
      });
      return await handleResponse<Slide>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function createSlide(lessonId: number, input: CreateSlideInput): Promise<Slide> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/slides/lesson/${lessonId}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input),
      });
      return await handleResponse<Slide>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function createSlidesBatch(lessonId: number, slides: CreateSlideInput[]): Promise<Slide[]> {
    setLoading(true);
    setError(null);
    const results: Slide[] = [];
    try {
      for (const slide of slides) {
        const created = await fetch(`${API_URL}/api/slides/lesson/${lessonId}`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(slide),
        });
        const result = await handleResponse<Slide>(created);
        results.push(result);
      }
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateSlide(id: number, input: UpdateSlideInput): Promise<Slide> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/slides/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(input),
      });
      return await handleResponse<Slide>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteSlide(id: number): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/slides/${id}`, {
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

  return {
    fetchSlidesByLesson,
    getSlideById,
    createSlide,
    createSlidesBatch,
    updateSlide,
    deleteSlide,
    loading,
    error,
  };
}
