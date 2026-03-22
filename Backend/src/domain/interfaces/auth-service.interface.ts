import type { User } from '../entities/user.entity';

export interface IAuthService {
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>;
  refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
  logout(refreshToken: string): Promise<void>;
  getProfile(userId: string): Promise<User | null>;
  saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
}