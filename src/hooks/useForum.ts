import { useState, useCallback } from 'react';
import type { PostTreeNode } from '../types/forum';
import { API_URL, apiFetch } from '../lib/api';

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

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    if (response.status === 400 && body?.errors) {
      const msgs = body.errors.map((e: { message: string }) => e.message).join('; ');
      throw new Error(msgs);
    }
    throw new Error(body?.message ?? `Error en la solicitud (HTTP ${response.status})`);
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
      const data = await handleResponse<PostTreeNode[]>(response);
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
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
      await handleResponse(response);
      await fetchPosts(courseId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
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
      await handleResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
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
      await handleResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
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
      await handleResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { posts, loading, error, fetchPosts, createPost, replyToPost, editPost, deletePost };
}
