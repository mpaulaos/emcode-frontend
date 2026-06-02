import { useState, useEffect } from "react";
import type { TeacherDashboardData } from "../types/dashboard";
import { API_URL } from "../lib/api";

interface UseTeacherDashboardResult {
  data: TeacherDashboardData | null;
  loading: boolean;
  error: string | null;
}

export function useTeacherDashboard(): UseTeacherDashboardResult {
  const [data, setData] = useState<TeacherDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDashboard() {
      try {
          const response = await fetch(
            `${API_URL}/dashboard/teacher`,
            {
              signal: controller.signal,
            },
          );

        if (!response.ok) {
          throw new Error(
            `Error al cargar el dashboard (HTTP ${response.status})`,
          );
        }

        const json: TeacherDashboardData = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Error inesperado");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}

