import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type {
  CreateProjectDto,
  UpdateProjectDto,
} from '../../application/dto';
import {
  GetProjectsUseCase,
  GetProjectBySlugUseCase,
  CreateProjectUseCase,
  UpdateProjectUseCase,
  DeleteProjectUseCase,
} from '../../application/use-cases';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly getProjectsUseCase: GetProjectsUseCase,
    private readonly getProjectBySlugUseCase: GetProjectBySlugUseCase,
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
  ) {}

  @Get()
  async findAll(@Query('featured') featured?: string) {
    const featuredOnly = featured === 'true';
    const projects = await this.getProjectsUseCase.execute(featuredOnly);
    return {
      success: true,
      data: projects,
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const project = await this.getProjectBySlugUseCase.execute(slug);
    return {
      success: true,
      data: project,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateProjectDto) {
    const project = await this.createProjectUseCase.execute(dto);
    return {
      success: true,
      data: project,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    const project = await this.updateProjectUseCase.execute(id, dto);
    return {
      success: true,
      data: project,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.deleteProjectUseCase.execute(id);
    return {
      success: true,
      data: null,
    };
  }
}
