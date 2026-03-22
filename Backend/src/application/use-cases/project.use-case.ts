import { Inject, Injectable } from '@nestjs/common';
import type { IProjectRepository } from '../../domain/interfaces/project-repository.interface';
import type { ICacheService } from '../../domain/interfaces/cache-service.interface';
import type { Project } from '../../domain/entities/project.entity';
import type { CreateProjectDto } from '../dto/project.dto';
import type { UpdateProjectDto } from '../dto/project.dto';
import { TProjectRepository, TCacheService } from '../../domain/tokens';

@Injectable()
export class GetProjectsUseCase {
  constructor(
    @Inject(TProjectRepository) private readonly projectRepository: IProjectRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(featuredOnly?: boolean): Promise<Project[]> {
    const cacheKey = `projects:${featuredOnly ?? false}`;

    const cached = await this.cacheService.get<Project[]>(cacheKey);
    if (cached) return cached;

    const projects = await this.projectRepository.findAll(featuredOnly);
    await this.cacheService.set(cacheKey, projects, '10m');
    return projects;
  }
}

@Injectable()
export class GetProjectBySlugUseCase {
  constructor(
    @Inject(TProjectRepository) private readonly projectRepository: IProjectRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(slug: string): Promise<Project> {
    const cacheKey = `project:${slug}`;

    const cached = await this.cacheService.get<Project>(cacheKey);
    if (cached) return cached;

    const project = await this.projectRepository.findBySlug(slug);
    if (!project) {
      throw new Error('Project not found');
    }

    await this.cacheService.set(cacheKey, project, '10m');
    return project;
  }
}

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(TProjectRepository) private readonly projectRepository: IProjectRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(dto: CreateProjectDto): Promise<Project> {
    const project = await this.projectRepository.create(dto);
    await this.cacheService.delPattern('projects:*');
    return project;
  }
}

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject(TProjectRepository) private readonly projectRepository: IProjectRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(id: string, dto: UpdateProjectDto): Promise<Project> {
    const existing = await this.projectRepository.findById(id);
    if (!existing) {
      throw new Error('Project not found');
    }

    const project = await this.projectRepository.update(id, dto);
    await this.cacheService.del(`project:${existing.slug}`);
    await this.cacheService.delPattern('projects:*');
    return project;
  }
}

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject(TProjectRepository) private readonly projectRepository: IProjectRepository,
    @Inject(TCacheService) private readonly cacheService: ICacheService,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.projectRepository.findById(id);
    if (!existing) {
      throw new Error('Project not found');
    }

    await this.projectRepository.delete(id);
    await this.cacheService.del(`project:${existing.slug}`);
    await this.cacheService.delPattern('projects:*');
  }
}
