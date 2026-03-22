import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TCategoryRepository } from '../../domain/tokens';
import {
  GetCategoriesUseCase,
  GetCategoryBySlugUseCase,
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
} from '../../application/use-cases/category.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    { provide: TCategoryRepository, useClass: CategoryRepository },
    GetCategoriesUseCase,
    GetCategoryBySlugUseCase,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  exports: [TCategoryRepository],
})
export class CategoryModule {}
