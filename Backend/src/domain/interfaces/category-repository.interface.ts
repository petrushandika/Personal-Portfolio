import type { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  create(data: { name: string; slug: string; description?: string; color?: string }): Promise<Category>;
  update(id: string, data: Partial<Pick<Category, 'name' | 'slug' | 'description' | 'color'>>): Promise<Category>;
  delete(id: string): Promise<void>;
}
