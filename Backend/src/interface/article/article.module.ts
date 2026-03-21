import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleRepository } from '../../infrastructure/repositories';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TArticleRepository } from '../../domain/tokens';
import {
  GetArticlesUseCase,
  GetArticleBySlugUseCase,
  CreateArticleUseCase,
  UpdateArticleUseCase,
  DeleteArticleUseCase,
} from '../../application/use-cases';

@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [ArticleController],
  providers: [
    { provide: TArticleRepository, useClass: ArticleRepository },
    GetArticlesUseCase,
    GetArticleBySlugUseCase,
    CreateArticleUseCase,
    UpdateArticleUseCase,
    DeleteArticleUseCase,
  ],
  exports: [TArticleRepository],
})
export class ArticleModule {}
