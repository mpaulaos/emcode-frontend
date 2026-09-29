import { useState } from 'react';
import type { Slide, CreateSlideInput, UpdateSlideInput } from '../types/slide';
import { API_URL, apiFetch } from '../lib/api';
import { getApiErrorMessage, getFriendlyErrorMessage } from '../lib/friendlyErrors';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(getApiErrorMessage(body, response.status, 'No pudimos completar la acción del contenido. Inténtalo de nuevo.'));
    }
    if (response.status === 204) return undefined as T;
    return response.json();
  }

  async function fetchSlidesByLesson(lessonId: number): Promise<Slide[]> {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/slides/lesson/${lessonId}`);
      return await handleResponse<Slide[]>(response);
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos cargar el contenido. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  async function getSlideById(id: number): Promise<Slide> {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/slides/${id}`);
      return await handleResponse<Slide>(response);
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos cargar el contenido. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  async function createSlide(lessonId: number, input: CreateSlideInput): Promise<Slide> {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/slides/lesson/${lessonId}`, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      return await handleResponse<Slide>(response);
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos crear el contenido. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
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
        const created = await apiFetch(`${API_URL}/api/slides/lesson/${lessonId}`, {
          method: 'POST',
          body: JSON.stringify(slide),
        });
        const result = await handleResponse<Slide>(created);
        results.push(result);
      }
      return results;
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos crear el contenido. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  async function updateSlide(id: number, input: UpdateSlideInput): Promise<Slide> {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/slides/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
      });
      return await handleResponse<Slide>(response);
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos guardar los cambios. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteSlide(id: number): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/slides/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse<void>(response);
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos eliminar el contenido. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
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
