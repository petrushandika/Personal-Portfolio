import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleRepository } from '../../infrastructure/repositories/article.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TArticleRepository } from '../../domain/tokens';
import {
  GetArticlesUseCase,
  GetArticleBySlugUseCase,
  CreateArticleUseCase,
  UpdateArticleUseCase,
  DeleteArticleUseCase,
} from '../../application/use-cases/article.use-case';

@Module({
  imports: [DatabaseModule],
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