export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string | null;
  avatar?: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}