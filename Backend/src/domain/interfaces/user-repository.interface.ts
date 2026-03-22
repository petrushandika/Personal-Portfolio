import type { User } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: { email: string; passwordHash: string; name?: string; role: string }): Promise<User>;
  update(id: string, data: Partial<Pick<User, 'name' | 'avatar' | 'email'>>): Promise<User>;
}