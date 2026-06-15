import { useFetch } from '../lib/useFetch';
import type { TeacherDashboardData } from '../types/dashboard';
import { API_URL } from '../lib/api';

interface UseTeacherDashboardResult {
  data: TeacherDashboardData | null;
  loading: boolean;
  error: string | null;
}

export function useTeacherDashboard(): UseTeacherDashboardResult {
  return useFetch<TeacherDashboardData>(`${API_URL}/dashboard/teacher`);
}

