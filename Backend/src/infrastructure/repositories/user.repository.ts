import { Inject } from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { User } from '../../domain/entities/user.entity';
import { eq } from 'drizzle-orm';
import { users } from '../../database/schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../database/schema';

export class UserRepository implements IUserRepository {
  constructor(
    @Inject('DB') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return (user as User) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return (user as User) ?? null;
  }

  async create(data: { email: string; passwordHash: string; name?: string; role: string }): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values(data)
      .returning();
    return user as User;
  }

  async update(id: string, data: Partial<Pick<User, 'name' | 'avatar' | 'email'>>): Promise<User> {
    const [user] = await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user as User;
  }
}
