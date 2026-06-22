import { useState } from 'react';
import type { Topic } from '../types/topic';
import { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface CreateTopicInput {
  topicName: string;
  description?: string;
}

interface UpdateTopicInput {
  topicName?: string;
  description?: string;
}

interface UseTopicsResult {
  createTopic: (courseId: string, input: CreateTopicInput) => Promise<Topic>;
  updateTopic: (topicId: number, input: UpdateTopicInput) => Promise<Topic>;
  deleteTopic: (topicId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useTopics(): UseTopicsResult {
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

  async function createTopic(courseId: string, input: CreateTopicInput): Promise<Topic> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/topics/course/${courseId}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input),
      });
      return await handleResponse<Topic>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateTopic(topicId: number, input: UpdateTopicInput): Promise<Topic> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/topics/${topicId}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(input),
      });
      return await handleResponse<Topic>(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteTopic(topicId: number): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/topics/${topicId}`, {
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

  return { createTopic, updateTopic, deleteTopic, loading, error };
}
