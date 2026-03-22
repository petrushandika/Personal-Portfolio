import type { Project } from '../entities/project.entity';

export interface IProjectRepository {
  findAll(featuredOnly?: boolean): Promise<Project[]>;
  findBySlug(slug: string): Promise<Project | null>;
  findById(id: string): Promise<Project | null>;
  create(data: Partial<Project>): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<void>;
}