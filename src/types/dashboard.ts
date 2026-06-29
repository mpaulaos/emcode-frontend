export interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface TeacherDashboardData {
  teacherName: string;
  courses: Course[];
}

export interface StudentDashboardData {
  studentName: string;
  courses: Course[];
}
