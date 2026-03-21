import { Injectable, NotFoundException } from '@nestjs/common';
import { and, desc, eq, like, sql } from 'drizzle-orm';
import { articles } from '../../database/schema';
import type { CacheService } from '../../infrastructure/cache/cache.module';

export interface PaginationParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable()
export class ArticleService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly db: any, private readonly cache: CacheService) {}

  async findAll(params: PaginationParams): Promise<PaginatedResult<any>> {
    const page = params.page ?? 1;
    const limit = Math.min(params.limit ?? 10, 50);
    const offset = (page - 1) * limit;

    const cacheKey = `articles:${JSON.stringify(params)}`;
    const cached = await this.cache.get<PaginatedResult<any>>(cacheKey);
    if (cached) return cached;

    const conditions = [];

    if (params.status) {
      conditions.push(eq(articles.status, params.status));
    }

    if (params.search) {
      conditions.push(like(articles.title, `%${params.search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
      this.db
        .select()
        .from(articles)
        .where(whereClause)
        .orderBy(desc(articles.publishedAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ count: sql<number>`count(*)` }).from(articles).where(whereClause),
    ]);

    const total = Number(countResult[0]?.count) || 0;
    const result: PaginatedResult<any> = {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    await this.cache.set(cacheKey, result, '5m');
    return result;
  }

  async findBySlug(slug: string): Promise<any> {
    const cacheKey = `article:${slug}`;
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) return cached;

    const article = await this.db.query.articles.findFirst({
      where: eq(articles.slug, slug),
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    await this.cache.set(cacheKey, article, '10m');
    return article;
  }

  async create(dto: any, authorId: string): Promise<any> {
    const [article] = await this.db
      .insert(articles)
      .values({
        ...dto,
        authorId,
        status: 'draft',
      })
      .returning();

    await this.cache.delPattern('articles:*');
    return article;
  }

  async update(id: string, dto: any): Promise<any> {
    const existing = await this.db.query.articles.findFirst({
      where: eq(articles.id, id),
    });

    if (!existing) {
      throw new NotFoundException('Article not found');
    }

    const [article] = await this.db
      .update(articles)
      .set({
        ...dto,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, id))
      .returning();

    await this.cache.del(`article:${existing.slug}`);
    await this.cache.delPattern('articles:*');
    return article;
  }

  async delete(id: string): Promise<void> {
    const existing = await this.db.query.articles.findFirst({
      where: eq(articles.id, id),
    });

    if (!existing) {
      throw new NotFoundException('Article not found');
    }

    await this.db.delete(articles).where(eq(articles.id, id));

    await this.cache.del(`article:${existing.slug}`);
    await this.cache.delPattern('articles:*');
  }
}

export interface CreateArticleDto {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: Date;
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {
  status?: 'draft' | 'published';
}
