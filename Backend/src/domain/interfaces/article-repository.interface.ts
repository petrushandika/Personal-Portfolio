import type { Article } from '../entities/article.entity';

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