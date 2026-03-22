import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { CreateArticleDto } from '../../application/dto/article.dto';
import type { UpdateArticleDto } from '../../application/dto/article.dto';
import type { PaginationDto } from '../../application/dto/article.dto';
import { GetArticlesUseCase } from '../../application/use-cases/article.use-case';
import { GetArticleBySlugUseCase } from '../../application/use-cases/article.use-case';
import { CreateArticleUseCase } from '../../application/use-cases/article.use-case';
import { UpdateArticleUseCase } from '../../application/use-cases/article.use-case';
import { DeleteArticleUseCase } from '../../application/use-cases/article.use-case';

@Controller('articles')
export class ArticleController {
  constructor(
    @Inject(GetArticlesUseCase) private readonly getArticlesUseCase: GetArticlesUseCase,
    @Inject(GetArticleBySlugUseCase) private readonly getArticleBySlugUseCase: GetArticleBySlugUseCase,
    @Inject(CreateArticleUseCase) private readonly createArticleUseCase: CreateArticleUseCase,
    @Inject(UpdateArticleUseCase) private readonly updateArticleUseCase: UpdateArticleUseCase,
    @Inject(DeleteArticleUseCase) private readonly deleteArticleUseCase: DeleteArticleUseCase,
  ) {}

  @Get()
  async findAll(@Query() query: PaginationDto) {
    const result = await this.getArticlesUseCase.execute(query);
    return {
      success: true,
      ...result,
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const article = await this.getArticleBySlugUseCase.execute(slug);
    return {
      success: true,
      data: article,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateArticleDto, @Req() req: Request) {
    const user = (req as Request & { user: { userId: string } }).user;
    const article = await this.createArticleUseCase.execute(dto, user.userId);
    return {
      success: true,
      data: article,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    const article = await this.updateArticleUseCase.execute(id, dto);
    return {
      success: true,
      data: article,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.deleteArticleUseCase.execute(id);
    return {
      success: true,
      data: null,
    };
  }
}