import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  Inject,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateArticleDto, UpdateArticleDto, PaginationDto } from '../../application/dto/article.dto';
import {
  GetArticlesUseCase,
  GetArticleBySlugUseCase,
  CreateArticleUseCase,
  UpdateArticleUseCase,
  DeleteArticleUseCase,
} from '../../application/use-cases/article.use-case';

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
  @HttpCode(HttpStatus.CREATED)
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
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.deleteArticleUseCase.execute(id);
    return {
      success: true,
      data: null,
      message: 'Article deleted successfully',
    };
  }
}