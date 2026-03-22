export interface TechStackIcon {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string | null;
  techStack: string[];
  techStackIcons: TechStackIcon[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  images: string[];
  thumbnail?: string | null;
  featured: boolean;
  order: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
}