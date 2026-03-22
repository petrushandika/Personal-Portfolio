export interface TechStackIcon {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string;
  techStack: string[];
  techStackIcons: TechStackIcon[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  thumbnail?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
