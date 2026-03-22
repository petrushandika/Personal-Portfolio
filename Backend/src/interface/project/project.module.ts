import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectRepository } from '../../infrastructure/repositories/project.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TProjectRepository } from '../../domain/tokens';
import { GetProjectsUseCase } from '../../application/use-cases/project.use-case';
import { GetProjectBySlugUseCase } from '../../application/use-cases/project.use-case';
import { CreateProjectUseCase } from '../../application/use-cases/project.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/project.use-case';

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