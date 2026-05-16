import { useState, useEffect } from 'react';
import type { Car } from '../components/carData';

// ─── React Topic: Custom Hook ─────────────────────────────────────────────────
// A custom hook is just a regular function whose name starts with "use".
// It can call other hooks (useState, useEffect) and encapsulates reusable
// stateful logic so components stay clean.
//
// useCarData hides ALL fetch mechanics behind a simple interface:
//   const { cars, loading, error } = useCarData();
// The component doesn't need to know where or how the data is fetched.

interface UseCarDataResult {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

// ─── React Topic: useEffect + fetch ──────────────────────────────────────────
// useEffect runs AFTER the component renders. Passing an empty dependency
// array [] means "run this effect only once — when the component first mounts".
// This is the standard pattern for fetching data on load.
//
// fetch() returns a Promise. We create an async inner function and call it
// immediately, because useEffect's callback itself cannot be async.
export function useCarData(): UseCarDataResult {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ── React Topic: Abort Controller ──────────────────────────────────────
    // AbortController lets us cancel the fetch if the component unmounts
    // before the response arrives. This prevents a "state update on unmounted
    // component" warning — a common pitfall with useEffect + fetch.
    const controller = new AbortController();

    async function fetchCars() {
      try {
        //https://mocki.io/v1/8ea52d98-efd4-4495-aece-bd7621ee5fc2
        const response = await fetch('http://localhost:3000/cars', { signal: controller.signal });

        // ── React Topic: Error handling for HTTP responses ──────────────
        // fetch() only rejects on network failure, NOT on HTTP error codes
        // (e.g. 404, 500). We must check response.ok ourselves.
        if (!response.ok) {
          throw new Error(`Failed to load car data (HTTP ${response.status})`);
        }

        const data: Car[] = await response.json();
        setCars(data);
      } catch (err) {
        // ── React Topic: Ignoring abort errors ─────────────────────────
        // When the AbortController cancels the fetch, it throws a DOMException
        // with name "AbortError". We should NOT treat that as a real error.
        if (err instanceof DOMException && err.name === 'AbortError') return;

        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();

    // ── React Topic: Cleanup function ──────────────────────────────────────
    // The function returned from useEffect is the "cleanup". React calls it
    // when the component unmounts. Here we abort any in-flight fetch.
    return () => controller.abort();
  }, []); // ← empty array: run once on mount

  return { cars, loading, error };
}
