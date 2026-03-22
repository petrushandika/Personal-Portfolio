import type { Article, ArticleWithAuthor } from '../entities/article.entity';

export interface IArticleRepository {
  findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    categoryId?: string;
    tag?: string;
  }): Promise<{ data: ArticleWithAuthor[]; total: number }>;
  findBySlug(slug: string): Promise<ArticleWithAuthor | null>;
  findById(id: string): Promise<Article | null>;
  create(data: Partial<Article> & { authorId: string }): Promise<Article>;
  update(id: string, data: Partial<Article>): Promise<Article>;
  delete(id: string): Promise<void>;
}