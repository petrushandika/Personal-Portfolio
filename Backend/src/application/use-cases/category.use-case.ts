import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ICategoryRepository } from '../../domain/interfaces/category-repository.interface';
import type { ICacheService } from '../../domain/interfaces/cache-service.interface';
import type { Category } from '../../domain/entities/category.entity';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { TCategoryRepository, TCacheService } from '../../domain/tokens';

@Injectable()
export class GetCategoriesUseCase {
  constructor(
    @Inject(TCategoryRepository) private readonly categoryRepository: ICategoryRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(): Promise<Category[]> {
    const cacheKey = 'categories:all';

    const cached = await this.cacheService.get<Category[]>(cacheKey);
    if (cached) return cached;

    const categories = await this.categoryRepository.findAll();
    await this.cacheService.set(cacheKey, categories, '30m');
    return categories;
  }
}

@Injectable()
export class GetCategoryBySlugUseCase {
  constructor(
    @Inject(TCategoryRepository) private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findBySlug(slug);
    if (!category) {
      throw new NotFoundException(`Category with slug '${slug}' not found`);
    }
    return category;
  }
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(TCategoryRepository) private readonly categoryRepository: ICategoryRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(dto: CreateCategoryDto): Promise<Category> {
    const existing = await this.categoryRepository.findBySlug(dto.slug);
    if (existing) {
      throw new ConflictException(`Category with slug '${dto.slug}' already exists`);
    }

    const category = await this.categoryRepository.create(dto);
    await this.cacheService.delPattern('categories:*');
    return category;
  }
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(TCategoryRepository) private readonly categoryRepository: ICategoryRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const existing = await this.categoryRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Category with id '${id}' not found`);
    }

    if (dto.slug && dto.slug !== existing.slug) {
      const slugExists = await this.categoryRepository.findBySlug(dto.slug);
      if (slugExists) {
        throw new ConflictException(`Category with slug '${dto.slug}' already exists`);
      }
    }

    const category = await this.categoryRepository.update(id, dto);
    await this.cacheService.delPattern('categories:*');
    return category;
  }
}

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject(TCategoryRepository) private readonly categoryRepository: ICategoryRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.categoryRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Category with id '${id}' not found`);
    }

    await this.categoryRepository.delete(id);
    await this.cacheService.delPattern('categories:*');
    await this.cacheService.delPattern('articles:*');
  }
}
