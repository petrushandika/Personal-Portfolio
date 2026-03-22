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
  UseGuards,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategoryDto, UpdateCategoryDto } from '../../application/dto/category.dto';
import {
  GetCategoriesUseCase,
  GetCategoryBySlugUseCase,
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
} from '../../application/use-cases/category.use-case';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(GetCategoriesUseCase) private readonly getCategoriesUseCase: GetCategoriesUseCase,
    @Inject(GetCategoryBySlugUseCase) private readonly getCategoryBySlugUseCase: GetCategoryBySlugUseCase,
    @Inject(CreateCategoryUseCase) private readonly createCategoryUseCase: CreateCategoryUseCase,
    @Inject(UpdateCategoryUseCase) private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    @Inject(DeleteCategoryUseCase) private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Get()
  async findAll() {
    const categories = await this.getCategoriesUseCase.execute();
    return {
      success: true,
      data: categories,
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const category = await this.getCategoryBySlugUseCase.execute(slug);
    return {
      success: true,
      data: category,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCategoryDto) {
    const category = await this.createCategoryUseCase.execute(dto);
    return {
      success: true,
      data: category,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const category = await this.updateCategoryUseCase.execute(id, dto);
    return {
      success: true,
      data: category,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.deleteCategoryUseCase.execute(id);
    return {
      success: true,
      data: null,
      message: 'Category deleted successfully',
    };
  }
}
