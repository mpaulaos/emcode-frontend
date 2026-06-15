import { useReducer, useEffect } from 'react';

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: number | null;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: number | null;
}

type FetchAction<T> =
  | { type: 'START' }
  | { type: 'SUCCESS'; data: T; status: number }
  | { type: 'HTTP_ERROR'; status: number }
  | { type: 'ERROR'; error: string };

function fetchReducer<T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> {
  switch (action.type) {
    case 'START':
      return { data: null, loading: true, error: null, status: null };
    case 'SUCCESS':
      return { data: action.data, loading: false, error: null, status: action.status };
    case 'HTTP_ERROR':
      return { data: null, loading: false, error: null, status: action.status };
    case 'ERROR':
      return { data: null, loading: false, error: action.error, status: null };
  }
}

export function useFetch<T>(url: string | null): UseFetchResult<T> {
  const [state, dispatch] = useReducer(fetchReducer<T>, {
    data: null,
    loading: url !== null,
    error: null,
    status: null,
  });

  useEffect(() => {
    if (!url) return;

    dispatch({ type: 'START' });

    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          dispatch({ type: 'HTTP_ERROR', status: response.status });
          return;
        }
        const json: T = await response.json();
        dispatch({ type: 'SUCCESS', data: json, status: response.status });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        dispatch({ type: 'ERROR', error: err instanceof Error ? err.message : 'Error inesperado' });
      }
    }

    fetchData();
    return () => controller.abort();
  }, [url]);

  return state;
}
