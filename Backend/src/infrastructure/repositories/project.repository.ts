import type { IProjectRepository } from '../../domain/interfaces';
import type { Project } from '../../domain/entities';
import { asc, desc, eq } from 'drizzle-orm';
import { projects } from '../../database/schema';

export class ProjectRepository implements IProjectRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly db: any) {}

  async findAll(featuredOnly?: boolean): Promise<Project[]> {
    const condition = featuredOnly ? eq(projects.featured, true) : undefined;
    const orderBy = featuredOnly ? asc(projects.order) : desc(projects.createdAt);

    const data = await this.db.select().from(projects).where(condition).orderBy(orderBy);
    return data.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      content: row.content ?? undefined,
      techStack: row.techStack,
      githubUrl: row.githubUrl ?? undefined,
      liveUrl: row.liveUrl ?? undefined,
      images: row.images,
      featured: row.featured,
      order: row.order,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const project = await this.db.query.projects.findFirst({
      where: eq(projects.slug, slug),
    });
    if (!project) return null;
    return project as Project;
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.db.query.projects.findFirst({
      where: eq(projects.id, id),
    });
    if (!project) return null;
    return project as Project;
  }

  async create(data: Partial<Project>): Promise<Project> {
    const [project] = await this.db.insert(projects).values(data as any).returning();
    return project as Project;
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const [project] = await this.db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project as Project;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(projects).where(eq(projects.id, id));
  }
}
