import { useCallback, useState } from "react";
import { useFetch } from "../lib/useFetch";
import type {
  Student,
  CourseStudentsData,
  AvailableStudent,
  CreateStudentInput,
  UpdateStudentInput,
  DisabilityOption,
} from "../types/Student";
import { API_URL, apiFetch } from "../lib/api";

// -------------------------------------------------------------
// Lista general del profesor autenticado ("Mis estudiantes"),
// con búsqueda y paginación.
// -------------------------------------------------------------
interface UseTeacherStudentsResult {
  students: Student[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTeacherStudents(search: string, page: number, pageSize = 10): UseTeacherStudentsResult {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const params = new URLSearchParams({
    search,
    page: String(page),
    pageSize: String(pageSize),
    _r: String(refreshIndex),
  });

  const { data, loading, error } = useFetch<{
    items: Student[];
    total: number;
    page: number;
    pageSize: number;
  }>(`${API_URL}/api/students?${params.toString()}`);

  const refetch = useCallback(() => {
    setRefreshIndex((current) => current + 1);
  }, []);

  return {
    students: data?.items ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? page,
    pageSize: data?.pageSize ?? pageSize,
    loading,
    error,
    refetch,
  };
}

// -------------------------------------------------------------
// Lista de estudiantes de UN curso específico, con el profesor
// incluido de primero (se resuelve combinando data.teacher + items).
// -------------------------------------------------------------
interface UseCourseStudentsResult {
  data: CourseStudentsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCourseStudents(
  courseId: string | undefined,
  search: string,
  page: number,
  pageSize = 10,
): UseCourseStudentsResult {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const params = new URLSearchParams({
    search,
    page: String(page),
    pageSize: String(pageSize),
    _r: String(refreshIndex),
  });

  const { data, loading, error } = useFetch<CourseStudentsData>(
    courseId ? `${API_URL}/api/courses/${courseId}/students?${params.toString()}` : null,
  );

  const refetch = useCallback(() => {
    setRefreshIndex((current) => current + 1);
  }, []);

  return { data, loading, error, refetch };
}

// -------------------------------------------------------------
// Estudiantes del profesor que aún no están en el curso actual
// (alimenta el buscador de "agregar estudiante existente").
// -------------------------------------------------------------
interface UseAvailableStudentsResult {
  students: AvailableStudent[];
  loading: boolean;
  error: string | null;
}

export function useAvailableStudents(courseId: string | undefined, search: string): UseAvailableStudentsResult {
  const params = new URLSearchParams({ search });
  const { data, loading, error } = useFetch<AvailableStudent[]>(
    courseId ? `${API_URL}/api/courses/${courseId}/students/available?${params.toString()}` : null,
  );

  return { students: data ?? [], loading, error };
}

interface UseDisabilitiesResult {
  data: DisabilityOption[] | null;
  loading: boolean;
  error: string | null;
}

export function useDisabilities(): UseDisabilitiesResult {
  return useFetch<DisabilityOption[]>(`${API_URL}/api/students/disabilities`);
}

// -------------------------------------------------------------
// Detalle de un estudiante puntual (acción "Ver detalles" del menú
// de 3 puntos en la lista de curso).
// -------------------------------------------------------------
interface UseStudentDetailResult {
  data: Student | null;
  loading: boolean;
  error: string | null;
}

export function useStudentDetail(studentId: number | null): UseStudentDetailResult {
  const { data, loading, error } = useFetch<Student>(
    studentId !== null ? `${API_URL}/api/students/${studentId}` : null,
  );
  return { data, loading, error };
}

interface UseCreateStudentResult {
  createStudent: (input: CreateStudentInput) => Promise<Student>;
  loading: boolean;
  error: string | null;
}

export function useCreateStudent(): UseCreateStudentResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createStudent = useCallback(async (input: CreateStudentInput): Promise<Student> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(`${API_URL}/api/students`, {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.message ?? `Error al crear el estudiante (HTTP ${response.status})`,
        );
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error inesperado";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createStudent, loading, error };
}

interface UseUpdateStudentResult {
  updateStudent: (id: number, input: UpdateStudentInput) => Promise<Student>;
  loading: boolean;
  error: string | null;
}

export function useUpdateStudent(): UseUpdateStudentResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStudent = useCallback(async (id: number, input: UpdateStudentInput): Promise<Student> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(`${API_URL}/api/students/${id}`, {
        method: "PATCH",
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.message ?? `Error al actualizar el estudiante (HTTP ${response.status})`,
        );
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error inesperado";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateStudent, loading, error };
}

interface UseEnrollStudentResult {
  enrollStudent: (courseId: number, studentId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Enrola a un estudiante YA EXISTENTE (de la lista general del profesor)
// en un curso puntual, sin pasar por el wizard completo de creación.
export function useEnrollStudent(): UseEnrollStudentResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enrollStudent = useCallback(async (courseId: number, studentId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(`${API_URL}/api/courses/${courseId}/students`, {
        method: "POST",
        body: JSON.stringify({ studentId }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.message ?? `Error al agregar el estudiante al curso (HTTP ${response.status})`,
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error inesperado";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { enrollStudent, loading, error };
}

interface UseRemoveStudentFromCourseResult {
  removeStudent: (courseId: number, studentId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useRemoveStudentFromCourse(): UseRemoveStudentFromCourseResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeStudent = useCallback(async (courseId: number, studentId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(`${API_URL}/api/courses/${courseId}/students/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.message ?? `Error al remover el estudiante del curso (HTTP ${response.status})`,
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error inesperado";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { removeStudent, loading, error };
}
