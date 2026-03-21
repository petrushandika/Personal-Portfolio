import type { User } from '../entities';
import type { Article } from '../entities';
import type { Project } from '../entities';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: { email: string; passwordHash: string; role: string }): Promise<User>;
}

export interface IArticleRepository {
  findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{ data: Article[]; total: number }>;
  findBySlug(slug: string): Promise<Article | null>;
  findById(id: string): Promise<Article | null>;
  create(data: Partial<Article> & { authorId: string }): Promise<Article>;
  update(id: string, data: Partial<Article>): Promise<Article>;
  delete(id: string): Promise<void>;
}

export interface IProjectRepository {
  findAll(featuredOnly?: boolean): Promise<Project[]>;
  findBySlug(slug: string): Promise<Project | null>;
  findById(id: string): Promise<Project | null>;
  create(data: Partial<Project>): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<void>;
}

export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, ttl?: string): Promise<void>;
  del(key: string): Promise<void>;
  delPattern(pattern: string): Promise<void>;
}

export interface IPasswordService {
  hash(password: string): Promise<string>;
  verify(password: string, hash: string): Promise<boolean>;
}

export interface IJwtService {
  generateAccessToken(payload: { sub: string; email: string; role: string }): Promise<string>;
  generateRefreshToken(): string;
  hashToken(token: string): Promise<string>;
}

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
