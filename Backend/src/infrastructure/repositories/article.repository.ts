import type { IArticleRepository } from '../../domain/interfaces';
import type { Article } from '../../domain/entities';
import { and, desc, eq, like, sql } from 'drizzle-orm';
import { articles } from '../../database/schema';

export class ArticleRepository implements IArticleRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly db: any) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{ data: Article[]; total: number }> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const offset = (page - 1) * limit;

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

    const mappedData: Article[] = data.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      featuredImage: row.featuredImage ?? undefined,
      status: row.status as 'draft' | 'published',
      metaTitle: row.metaTitle ?? undefined,
      metaDescription: row.metaDescription ?? undefined,
      authorId: row.authorId,
      publishedAt: row.publishedAt ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));

    return { data: mappedData, total: Number(countResult[0]?.count) || 0 };
  }

  async findBySlug(slug: string): Promise<Article | null> {
    const article = await this.db.query.articles.findFirst({
      where: eq(articles.slug, slug),
    });
    if (!article) return null;
    return article as Article;
  }

  async findById(id: string): Promise<Article | null> {
    const article = await this.db.query.articles.findFirst({
      where: eq(articles.id, id),
    });
    if (!article) return null;
    return article as Article;
  }

  async create(data: Partial<Article> & { authorId: string }): Promise<Article> {
    const [article] = await this.db
      .insert(articles)
      .values(data as any)
      .returning();
    return article as Article;
  }

  async update(id: string, data: Partial<Article>): Promise<Article> {
    const [article] = await this.db
      .update(articles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return article as Article;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(articles).where(eq(articles.id, id));
  }
}
