import { Injectable, NotFoundException } from '@nestjs/common';
import { asc, desc, eq } from 'drizzle-orm';
import { projects } from '../../database/schema';
import type { CacheService } from '../../infrastructure/cache/cache.module';

@Injectable()
export class ProjectService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly db: any, private readonly cache: CacheService) {}

  async findAll(featuredOnly?: boolean): Promise<any[]> {
    const cacheKey = `projects:${featuredOnly ?? false}`;
    const cached = await this.cache.get<any[]>(cacheKey);
    if (cached) return cached;

    const condition = featuredOnly ? eq(projects.featured, true) : undefined;
    const orderBy = featuredOnly ? asc(projects.order) : desc(projects.createdAt);

    const result = await this.db.select().from(projects).where(condition).orderBy(orderBy);

    await this.cache.set(cacheKey, result, '10m');
    return result;
  }

  async findBySlug(slug: string): Promise<any> {
    const cacheKey = `project:${slug}`;
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) return cached;

    const project = await this.db.query.projects.findFirst({
      where: eq(projects.slug, slug),
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.cache.set(cacheKey, project, '10m');
    return project;
  }

  async create(dto: CreateProjectDto): Promise<any> {
    const [project] = await this.db.insert(projects).values(dto).returning();
    await this.cache.delPattern('projects:*');
    return project;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<any> {
    const existing = await this.db.query.projects.findFirst({
      where: eq(projects.id, id),
    });

    if (!existing) {
      throw new NotFoundException('Project not found');
    }

    const [project] = await this.db
      .update(projects)
      .set({
        ...dto,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();

    await this.cache.del(`project:${existing.slug}`);
    await this.cache.delPattern('projects:*');
    return project;
  }

  async delete(id: string): Promise<void> {
    const existing = await this.db.query.projects.findFirst({
      where: eq(projects.id, id),
    });

    if (!existing) {
      throw new NotFoundException('Project not found');
    }

    await this.db.delete(projects).where(eq(projects.id, id));

    await this.cache.del(`project:${existing.slug}`);
    await this.cache.delPattern('projects:*');
  }
}

export interface CreateProjectDto {
  slug: string;
  title: string;
  description: string;
  content?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  featured?: boolean;
  order?: number;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  _?: never;
}
