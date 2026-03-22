import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleRepository } from '../../infrastructure/repositories/article.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TArticleRepository } from '../../domain/tokens';
import { GetArticlesUseCase } from '../../application/use-cases/article.use-case';
import { GetArticleBySlugUseCase } from '../../application/use-cases/article.use-case';
import { CreateArticleUseCase } from '../../application/use-cases/article.use-case';
import { UpdateArticleUseCase } from '../../application/use-cases/article.use-case';
import { DeleteArticleUseCase } from '../../application/use-cases/article.use-case';

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