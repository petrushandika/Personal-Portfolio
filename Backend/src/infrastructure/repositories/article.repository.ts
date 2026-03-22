import { Inject } from '@nestjs/common';
import type { IArticleRepository } from '../../domain/interfaces/article-repository.interface';
import type { Article, ArticleWithAuthor } from '../../domain/entities/article.entity';
import { and, desc, eq, like, sql, arrayContains } from 'drizzle-orm';
import { articles, users, categories } from '../../database/schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../database/schema';

export class ArticleRepository implements IArticleRepository {
  constructor(
    @Inject('DB') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    categoryId?: string;
    tag?: string;
  }): Promise<{ data: ArticleWithAuthor[]; total: number }> {
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
    if (params.categoryId) {
      conditions.push(eq(articles.categoryId, params.categoryId));
    }
    if (params.tag) {
      conditions.push(arrayContains(articles.tags, [params.tag]));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
      this.db
        .select({
          id: articles.id,
          slug: articles.slug,
          title: articles.title,
          excerpt: articles.excerpt,
          content: articles.content,
          featuredImage: articles.featuredImage,
          status: articles.status,
          categoryId: articles.categoryId,
          tags: articles.tags,
          readingTime: articles.readingTime,
          metaTitle: articles.metaTitle,
          metaDescription: articles.metaDescription,
          ogImage: articles.ogImage,
          canonicalUrl: articles.canonicalUrl,
          robots: articles.robots,
          schemaMarkup: articles.schemaMarkup,
          authorId: articles.authorId,
          publishedAt: articles.publishedAt,
          createdAt: articles.createdAt,
          updatedAt: articles.updatedAt,
          authorName: users.name,
          authorAvatar: users.avatar,
          categoryName: categories.name,
          categorySlug: categories.slug,
          categoryColor: categories.color,
        })
        .from(articles)
        .leftJoin(users, eq(articles.authorId, users.id))
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .where(whereClause)
        .orderBy(desc(articles.publishedAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ count: sql<number>`count(*)` }).from(articles).where(whereClause),
    ]);

    const mappedData: ArticleWithAuthor[] = data.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      featuredImage: row.featuredImage,
      status: row.status as 'draft' | 'published',
      categoryId: row.categoryId,
      tags: row.tags ?? [],
      readingTime: row.readingTime ?? 0,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      ogImage: row.ogImage,
      canonicalUrl: row.canonicalUrl,
      robots: row.robots ?? 'index,follow',
      schemaMarkup: row.schemaMarkup as Record<string, unknown> | null,
      authorId: row.authorId,
      publishedAt: row.publishedAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      author: {
        id: row.authorId,
        name: row.authorName ?? null,
        avatar: row.authorAvatar ?? null,
      },
      category: row.categoryId
        ? {
            id: row.categoryId,
            name: row.categoryName ?? '',
            slug: row.categorySlug ?? '',
            color: row.categoryColor ?? null,
          }
        : null,
    }));

    return { data: mappedData, total: Number(countResult[0]?.count) || 0 };
  }

  async findBySlug(slug: string): Promise<ArticleWithAuthor | null> {
    const rows = await this.db
      .select({
        id: articles.id,
        slug: articles.slug,
        title: articles.title,
        excerpt: articles.excerpt,
        content: articles.content,
        featuredImage: articles.featuredImage,
        status: articles.status,
        categoryId: articles.categoryId,
        tags: articles.tags,
        readingTime: articles.readingTime,
        metaTitle: articles.metaTitle,
        metaDescription: articles.metaDescription,
        ogImage: articles.ogImage,
        canonicalUrl: articles.canonicalUrl,
        robots: articles.robots,
        schemaMarkup: articles.schemaMarkup,
        authorId: articles.authorId,
        publishedAt: articles.publishedAt,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        authorName: users.name,
        authorAvatar: users.avatar,
        categoryName: categories.name,
        categorySlug: categories.slug,
        categoryColor: categories.color,
      })
      .from(articles)
      .leftJoin(users, eq(articles.authorId, users.id))
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(eq(articles.slug, slug))
      .limit(1);

    const row = rows[0];
    if (!row) return null;

    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      featuredImage: row.featuredImage,
      status: row.status as 'draft' | 'published',
      categoryId: row.categoryId,
      tags: row.tags ?? [],
      readingTime: row.readingTime ?? 0,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      ogImage: row.ogImage,
      canonicalUrl: row.canonicalUrl,
      robots: row.robots ?? 'index,follow',
      schemaMarkup: row.schemaMarkup as Record<string, unknown> | null,
      authorId: row.authorId,
      publishedAt: row.publishedAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      author: {
        id: row.authorId,
        name: row.authorName ?? null,
        avatar: row.authorAvatar ?? null,
      },
      category: row.categoryId
        ? {
            id: row.categoryId,
            name: row.categoryName ?? '',
            slug: row.categorySlug ?? '',
            color: row.categoryColor ?? null,
          }
        : null,
    };
  }

  async findById(id: string): Promise<Article | null> {
    const article = await this.db.query.articles.findFirst({
      where: eq(articles.id, id),
    });
    if (!article) return null;
    return article as unknown as Article;
  }

  async create(data: Partial<Article> & { authorId: string }): Promise<Article> {
    const [article] = await this.db
      .insert(articles)
      .values({
        slug: data.slug!,
        title: data.title!,
        excerpt: data.excerpt!,
        content: data.content!,
        authorId: data.authorId,
        featuredImage: data.featuredImage ?? null,
        status: data.status ?? 'draft',
        categoryId: data.categoryId ?? null,
        tags: data.tags ?? [],
        readingTime: data.readingTime ?? 0,
        metaTitle: data.metaTitle ?? null,
        metaDescription: data.metaDescription ?? null,
        ogImage: data.ogImage ?? null,
        canonicalUrl: data.canonicalUrl ?? null,
        robots: data.robots ?? 'index,follow',
        schemaMarkup: data.schemaMarkup ?? null,
        publishedAt: data.publishedAt ?? null,
      })
      .returning();
    return article as unknown as Article;
  }

  async update(id: string, data: Partial<Article>): Promise<Article> {
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.readingTime !== undefined) updateData.readingTime = data.readingTime;
    if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle;
    if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription;
    if (data.ogImage !== undefined) updateData.ogImage = data.ogImage;
    if (data.canonicalUrl !== undefined) updateData.canonicalUrl = data.canonicalUrl;
    if (data.robots !== undefined) updateData.robots = data.robots;
    if (data.schemaMarkup !== undefined) updateData.schemaMarkup = data.schemaMarkup;
    if (data.publishedAt !== undefined) updateData.publishedAt = data.publishedAt;

    const [article] = await this.db
      .update(articles)
      .set(updateData)
      .where(eq(articles.id, id))
      .returning();
    return article as unknown as Article;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(articles).where(eq(articles.id, id));
  }
}
