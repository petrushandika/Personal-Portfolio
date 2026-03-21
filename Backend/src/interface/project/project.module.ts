import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectRepository } from '../../infrastructure/repositories';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TProjectRepository } from '../../domain/tokens';
import {
  GetProjectsUseCase,
  GetProjectBySlugUseCase,
  CreateProjectUseCase,
  UpdateProjectUseCase,
  DeleteProjectUseCase,
} from '../../application/use-cases';

@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [ProjectController],
  providers: [
    { provide: TProjectRepository, useClass: ProjectRepository },
    GetProjectsUseCase,
    GetProjectBySlugUseCase,
    CreateProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
  ],
  exports: [TProjectRepository],
})
export class ProjectModule {}
