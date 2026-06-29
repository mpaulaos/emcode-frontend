export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  profilePicture: string | null;
  role: 'teacher' | 'student' | 'admin';
  isActive: boolean;
  isVerified: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
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

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  profilePicture?: string | null;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}