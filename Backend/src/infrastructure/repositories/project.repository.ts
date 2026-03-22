import { Inject } from '@nestjs/common';
import type { IProjectRepository } from '../../domain/interfaces/project-repository.interface';
import type { Project } from '../../domain/entities/project.entity';
import { asc, desc, eq } from 'drizzle-orm';
import { projects } from '../../database/schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../database/schema';

export class ProjectRepository implements IProjectRepository {
  constructor(
    @Inject('DB') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(featuredOnly?: boolean): Promise<Project[]> {
    const condition = featuredOnly ? eq(projects.featured, true) : undefined;
    const orderBy = featuredOnly ? asc(projects.order) : desc(projects.createdAt);

    const data = await this.db.select().from(projects).where(condition).orderBy(orderBy);
    return data as unknown as Project[];
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const project = await this.db.query.projects.findFirst({
      where: eq(projects.slug, slug),
    });
    if (!project) return null;
    return project as unknown as Project;
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.db.query.projects.findFirst({
      where: eq(projects.id, id),
    });
    if (!project) return null;
    return project as unknown as Project;
  }

  async create(data: Partial<Project>): Promise<Project> {
    const [project] = await this.db
      .insert(projects)
      .values({
        slug: data.slug!,
        title: data.title!,
        description: data.description!,
        content: data.content ?? null,
        techStack: data.techStack ?? [],
        techStackIcons: data.techStackIcons ?? [],
        githubUrl: data.githubUrl ?? null,
        liveUrl: data.liveUrl ?? null,
        images: data.images ?? [],
        thumbnail: data.thumbnail ?? null,
        featured: data.featured ?? false,
        order: data.order ?? 0,
        metaTitle: data.metaTitle ?? null,
        metaDescription: data.metaDescription ?? null,
        ogImage: data.ogImage ?? null,
      })
      .returning();
    return project as unknown as Project;
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.techStack !== undefined) updateData.techStack = data.techStack;
    if (data.techStackIcons !== undefined) updateData.techStackIcons = data.techStackIcons;
    if (data.githubUrl !== undefined) updateData.githubUrl = data.githubUrl;
    if (data.liveUrl !== undefined) updateData.liveUrl = data.liveUrl;
    if (data.images !== undefined) updateData.images = data.images;
    if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.order !== undefined) updateData.order = data.order;
    if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle;
    if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription;
    if (data.ogImage !== undefined) updateData.ogImage = data.ogImage;

    const [project] = await this.db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    return project as unknown as Project;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(projects).where(eq(projects.id, id));
  }
}
