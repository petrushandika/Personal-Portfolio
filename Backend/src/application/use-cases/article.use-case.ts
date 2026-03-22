import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IArticleRepository } from '../../domain/interfaces/article-repository.interface';
import type { ICacheService } from '../../domain/interfaces/cache-service.interface';
import type { Article, ArticleWithAuthor } from '../../domain/entities/article.entity';
import type { CreateArticleDto, UpdateArticleDto, PaginationDto } from '../dto/article.dto';
import { TArticleRepository, TCacheService } from '../../domain/tokens';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Calculates estimated reading time based on word count.
 * Average reading speed: 200 words per minute.
 */
function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

@Injectable()
export class GetArticlesUseCase {
  constructor(
    @Inject(TArticleRepository) private readonly articleRepository: IArticleRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(params: PaginationDto): Promise<PaginatedResult<ArticleWithAuthor>> {
    const page = params.page ?? 1;
    const limit = Math.min(params.limit ?? 10, 50);
    const cacheKey = `articles:${JSON.stringify({ ...params, page, limit })}`;

    const cached = await this.cacheService.get<PaginatedResult<ArticleWithAuthor>>(cacheKey);
    if (cached) return cached;

    const { data, total } = await this.articleRepository.findAll({ ...params, page, limit });

    const result: PaginatedResult<ArticleWithAuthor> = {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };

    await this.cacheService.set(cacheKey, result, '5m');
    return result;
  }
}

@Injectable()
export class GetArticleBySlugUseCase {
  constructor(
    @Inject(TArticleRepository) private readonly articleRepository: IArticleRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(slug: string): Promise<ArticleWithAuthor> {
    const cacheKey = `article:${slug}`;

    const cached = await this.cacheService.get<ArticleWithAuthor>(cacheKey);
    if (cached) return cached;

    const article = await this.articleRepository.findBySlug(slug);
    if (!article) {
      throw new NotFoundException(`Article with slug '${slug}' not found`);
    }

    await this.cacheService.set(cacheKey, article, '10m');
    return article;
  }
}

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject(TArticleRepository) private readonly articleRepository: IArticleRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(dto: CreateArticleDto, authorId: string): Promise<Article> {
    const readingTime = calculateReadingTime(dto.content);

    const data = {
      ...dto,
      authorId,
      status: 'draft' as const,
      tags: dto.tags ?? [],
      readingTime,
      publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
    };
    const article = await this.articleRepository.create(data);

    await this.cacheService.delPattern('articles:*');
    return article;
  }
}

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    @Inject(TArticleRepository) private readonly articleRepository: IArticleRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(id: string, dto: UpdateArticleDto): Promise<Article> {
    const existing = await this.articleRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Article with id '${id}' not found`);
    }

    const data: Record<string, unknown> = { ...dto };

    if (dto.content) {
      data.readingTime = calculateReadingTime(dto.content);
    }
    if (dto.publishedAt) {
      data.publishedAt = new Date(dto.publishedAt);
    }

    const article = await this.articleRepository.update(id, data as Partial<Article>);
    await this.cacheService.del(`article:${existing.slug}`);
    await this.cacheService.delPattern('articles:*');
    return article;
  }
}

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    @Inject(TArticleRepository) private readonly articleRepository: IArticleRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.articleRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Article with id '${id}' not found`);
    }

    await this.articleRepository.delete(id);
    await this.cacheService.del(`article:${existing.slug}`);
    await this.cacheService.delPattern('articles:*');
  }
}
