import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { CreateArticleDto, UpdateArticleDto, PaginationDto } from '../../application/dto';
import {
  GetArticlesUseCase,
  GetArticleBySlugUseCase,
  CreateArticleUseCase,
  UpdateArticleUseCase,
  DeleteArticleUseCase,
} from '../../application/use-cases';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly getArticlesUseCase: GetArticlesUseCase,
    private readonly getArticleBySlugUseCase: GetArticleBySlugUseCase,
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
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
  async create(@Body() dto: CreateArticleDto, @Req() req: any) {
    const user = req.user;
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
