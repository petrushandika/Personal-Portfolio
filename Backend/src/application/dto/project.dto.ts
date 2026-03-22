export interface TechStackIconDto {
  name: string;
  icon: string;
}

export class CreateProjectDto {
  slug: string;
  title: string;
  description: string;
  content?: string;
  techStack?: string[];
  techStackIcons?: TechStackIconDto[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  thumbnail?: string;
  featured?: boolean;
  order?: number;
}

export class UpdateProjectDto {
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  techStack?: string[];
  techStackIcons?: TechStackIconDto[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  thumbnail?: string;
  featured?: boolean;
  order?: number;
}
