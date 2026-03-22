export interface User {
  id: string;
  email: string;
  role: 'admin';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
