export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'teacher' | 'student' | 'admin';
  studentId?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}