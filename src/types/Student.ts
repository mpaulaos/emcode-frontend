export interface StudentCourse {
  id: number;
  title: string;
}

export interface StudentDisability {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  courses: StudentCourse[];
  disabilities: StudentDisability[];
}

export interface CourseStudent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  disabilities: StudentDisability[];
  progress: number;
}

export interface TeacherStudentsData {
  students: Student[];
}

export interface DisabilityOption {
  id: number;
  name: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CourseStudentsData extends PaginatedResult<CourseStudent> {
  course: { id: number; title: string };
  teacher: { id: number; firstName: string; lastName: string; email: string } | null;
}

export interface CreateStudentInput {
  firstName: string;
  lastName: string;
  email: string;
  disabilityIds: number[];
  courseIds: number[];
}

export interface UpdateStudentInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  disabilityIds?: number[];
}

export interface AvailableStudent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
