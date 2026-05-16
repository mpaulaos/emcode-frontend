import { useState, useEffect } from 'react';
import type { Car } from '../components/carData';

// ─── React Topic: Custom Hook with Parameters ────────────────────────────────
// Unlike useCarData which fetches all cars once, useCarDetails accepts a carId
// and fetches details for that specific car. When the carId changes, useEffect
// re-runs and fetches the new car's details.
//
// This demonstrates a key pattern: custom hooks can accept parameters and use
// them in the dependency array to trigger side effects when those values change.

interface UseCarDetailsResult {
  carDetails: Car | null;
  loading: boolean;
  error: string | null;
}

// ─── React Topic: Conditional useEffect Execution ────────────────────────────
// When carId is null, we skip fetching entirely. This allows the parent to
// control when fetching happens (e.g., only after a thumbnail is clicked).
export function useCarDetails(carId: number | null): UseCarDetailsResult {
  const [carDetails, setCarDetails] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ── React Topic: Early return in useEffect ─────────────────────────────
    // If carId is null, there's nothing to fetch. Return early to avoid
    // unnecessary fetch attempts. This keeps loading false and carDetails null.
    if (carId === null) {
      setCarDetails(null);
      setLoading(false);
      setError(null);
      return;
    }

    // ── React Topic: Abort Controller for cleanup ──────────────────────────
    // Essential for preventing race conditions when carId changes rapidly.
    // If the user clicks multiple thumbnails quickly, each previous fetch
    // is cancelled before the next one starts.
    const controller = new AbortController();

    async function fetchCarDetails() {
      setLoading(true);
      setError(null);

      try {
        // ── React Topic: Dynamic URL construction ──────────────────────────
        // We build the URL dynamically using the carId parameter.
        // Template literals make this clean and readable.
        const response = await fetch(`http://localhost:3000/cars/${carId}`, {
          signal: controller.signal
        });

        // ── React Topic: Error handling for HTTP responses ─────────────────
        // fetch() only rejects on network failure, NOT on HTTP error codes
        // (e.g. 404, 500). We must check response.ok ourselves.
        if (!response.ok) {
          throw new Error(`Failed to load car details (HTTP ${response.status})`);
        }

        const data: Car = await response.json();
        setCarDetails(data);
      } catch (err) {
        // ── React Topic: Ignoring abort errors ─────────────────────────────
        // When the AbortController cancels the fetch, it throws a DOMException
        // with name "AbortError". We should NOT treat that as a real error.
        if (err instanceof DOMException && err.name === 'AbortError') return;

        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setCarDetails(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCarDetails();

    // ── React Topic: Cleanup function ──────────────────────────────────────
    // The function returned from useEffect is the "cleanup". React calls it:
    //   1. Before running the effect again (when carId changes)
    //   2. When the component unmounts
    // Here we abort any in-flight fetch to prevent state updates on stale data.
    return () => controller.abort();
  }, [carId]); // ← carId in dependency array: re-run when it changes

  return { carDetails, loading, error };
}