import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectRepository } from '../../infrastructure/repositories/project.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TProjectRepository } from '../../domain/tokens';
import {
  GetProjectsUseCase,
  GetProjectBySlugUseCase,
  CreateProjectUseCase,
  UpdateProjectUseCase,
  DeleteProjectUseCase,
} from '../../application/use-cases/project.use-case';

@Module({
  imports: [DatabaseModule],
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