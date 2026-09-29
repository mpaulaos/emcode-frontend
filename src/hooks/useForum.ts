import { useState, useCallback } from 'react';
import type { PostTreeNode } from '../types/forum';
import { API_URL, apiFetch } from '../lib/api';
import { getApiErrorMessage, getFriendlyErrorMessage } from '../lib/friendlyErrors';

interface UseForumResult {
  posts: PostTreeNode[];
  loading: boolean;
  error: string | null;
  fetchPosts: (courseId: string) => Promise<void>;
  createPost: (courseId: string, content: string) => Promise<void>;
  replyToPost: (postId: number, content: string) => Promise<void>;
  editPost: (postId: number, content: string) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
}

async function handleResponse<T>(response: Response, fallback = 'No se pudo completar la acción del foro. Inténtalo de nuevo.'): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(getApiErrorMessage(body, response.status, fallback));
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

export function useForum(): UseForumResult {
  const [posts, setPosts] = useState<PostTreeNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/posts/course/${courseId}`);
      const data = await handleResponse<PostTreeNode[]>(response, 'No pudimos cargar las publicaciones. Inténtalo de nuevo.');
      setPosts(data);
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos cargar las publicaciones. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (courseId: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/posts/course/${courseId}`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      await handleResponse(response, 'No pudimos publicar tu mensaje. Inténtalo de nuevo.');
      await fetchPosts(courseId);
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos publicar tu mensaje. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [fetchPosts]);

  const replyToPost = useCallback(async (postId: number, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/posts/${postId}/replies`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      await handleResponse(response, 'No pudimos enviar tu respuesta. Inténtalo de nuevo.');
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos enviar tu respuesta. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const editPost = useCallback(async (postId: number, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({ content }),
      });
      await handleResponse(response, 'No pudimos guardar los cambios. Inténtalo de nuevo.');
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos guardar los cambios. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePost = useCallback(async (postId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_URL}/api/posts/${postId}`, {
        method: 'DELETE',
      });
      await handleResponse(response, 'No pudimos eliminar la publicación. Inténtalo de nuevo.');
    } catch (err) {
      const message = getFriendlyErrorMessage(err, 'No pudimos eliminar la publicación. Inténtalo de nuevo.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { posts, loading, error, fetchPosts, createPost, replyToPost, editPost, deletePost };
}
