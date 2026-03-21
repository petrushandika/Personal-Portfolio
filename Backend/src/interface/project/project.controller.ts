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
import type { CreateProjectDto, ProjectService, UpdateProjectDto } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(@Query('featured') featured?: string) {
    const featuredOnly = featured === 'true';
    const projects = await this.projectService.findAll(featuredOnly);
    return {
      success: true,
      data: projects,
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const project = await this.projectService.findBySlug(slug);
    return {
      success: true,
      data: project,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateProjectDto) {
    const project = await this.projectService.create(dto);
    return {
      success: true,
      data: project,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    const project = await this.projectService.update(id, dto);
    return {
      success: true,
      data: project,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.projectService.delete(id);
    return {
      success: true,
      data: null,
    };
  }
}
