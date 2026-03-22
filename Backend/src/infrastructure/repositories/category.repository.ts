import { Inject } from '@nestjs/common';
import type { ICategoryRepository } from '../../domain/interfaces/category-repository.interface';
import type { Category } from '../../domain/entities/category.entity';
import { asc, eq } from 'drizzle-orm';
import { categories } from '../../database/schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../database/schema';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @Inject('DB') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<Category[]> {
    const data = await this.db.select().from(categories).orderBy(asc(categories.name));
    return data as Category[];
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.db.query.categories.findFirst({
      where: eq(categories.id, id),
    });
    return (category as Category) ?? null;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const category = await this.db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });
    return (category as Category) ?? null;
  }

  async create(data: { name: string; slug: string; description?: string; color?: string }): Promise<Category> {
    const [category] = await this.db.insert(categories).values(data).returning();
    return category as Category;
  }

  async update(id: string, data: Partial<Pick<Category, 'name' | 'slug' | 'description' | 'color'>>): Promise<Category> {
    const [category] = await this.db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return category as Category;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(categories).where(eq(categories.id, id));
  }
}
