import { Inject } from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { User } from '../../domain/entities/user.entity';
import { eq } from 'drizzle-orm';
import { users } from '../../database/schema';

export class UserRepository implements IUserRepository {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject('DB') private readonly db: any,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user ?? null;
  }

  async create(data: { email: string; passwordHash: string; role: string }): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values(data)
      .returning();
    return user as User;
  }
}
