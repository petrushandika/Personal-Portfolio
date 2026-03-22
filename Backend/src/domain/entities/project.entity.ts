export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}