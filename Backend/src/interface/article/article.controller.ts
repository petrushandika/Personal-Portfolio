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
import { ArticleService, PaginationParams } from './article.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@Query() query: PaginationParams) {
    const result = await this.articleService.findAll(query);
    return {
      success: true,
      ...result,
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const article = await this.articleService.findBySlug(slug);
    return {
      success: true,
      data: article,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateArticleDto, @Req() req: any) {
    const user = req.user;
    const article = await this.articleService.create(dto, user.userId);
    return {
      success: true,
      data: article,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    const article = await this.articleService.update(id, dto);
    return {
      success: true,
      data: article,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.articleService.delete(id);
    return {
      success: true,
      data: null,
    };
  }
}
