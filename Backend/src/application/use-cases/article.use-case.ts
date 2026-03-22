import { Inject, Injectable } from '@nestjs/common';
import type { IArticleRepository } from '../../domain/interfaces/article-repository.interface';
import type { ICacheService } from '../../domain/interfaces/cache-service.interface';
import type { Article } from '../../domain/entities/article.entity';
import type { CreateArticleDto } from '../dto/article.dto';
import type { UpdateArticleDto } from '../dto/article.dto';
import type { PaginationDto } from '../dto/article.dto';
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

@Injectable()
export class GetArticlesUseCase {
  constructor(
    @Inject(TArticleRepository) private readonly articleRepository: IArticleRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(params: PaginationDto): Promise<PaginatedResult<Article>> {
    const page = params.page ?? 1;
    const limit = Math.min(params.limit ?? 10, 50);
    const cacheKey = `articles:${JSON.stringify(params)}`;

    const cached = await this.cacheService.get<PaginatedResult<Article>>(cacheKey);
    if (cached) return cached;

    const { data, total } = await this.articleRepository.findAll({ ...params, page, limit });

    const result: PaginatedResult<Article> = {
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

  async execute(slug: string): Promise<Article> {
    const cacheKey = `article:${slug}`;

    const cached = await this.cacheService.get<Article>(cacheKey);
    if (cached) return cached;

    const article = await this.articleRepository.findBySlug(slug);
    if (!article) {
      throw new Error('Article not found');
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
    const data = {
      ...dto,
      authorId,
      status: 'draft' as const,
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
      throw new Error('Article not found');
    }

    const data = {
      ...dto,
      publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
    };
    const article = await this.articleRepository.update(id, data);
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
      throw new Error('Article not found');
    }

    await this.articleRepository.delete(id);
    await this.cacheService.del(`article:${existing.slug}`);
    await this.cacheService.delPattern('articles:*');
  }
}
