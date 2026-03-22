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
  UseGuards,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto, UpdateProjectDto } from '../../application/dto/project.dto';
import {
  GetProjectsUseCase,
  GetProjectBySlugUseCase,
  CreateProjectUseCase,
  UpdateProjectUseCase,
  DeleteProjectUseCase,
} from '../../application/use-cases/project.use-case';

@Controller('projects')
export class ProjectController {
  constructor(
    @Inject(GetProjectsUseCase) private readonly getProjectsUseCase: GetProjectsUseCase,
    @Inject(GetProjectBySlugUseCase) private readonly getProjectBySlugUseCase: GetProjectBySlugUseCase,
    @Inject(CreateProjectUseCase) private readonly createProjectUseCase: CreateProjectUseCase,
    @Inject(UpdateProjectUseCase) private readonly updateProjectUseCase: UpdateProjectUseCase,
    @Inject(DeleteProjectUseCase) private readonly deleteProjectUseCase: DeleteProjectUseCase,
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
  @HttpCode(HttpStatus.CREATED)
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
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.deleteProjectUseCase.execute(id);
    return {
      success: true,
      data: null,
      message: 'Project deleted successfully',
    };
  }
}