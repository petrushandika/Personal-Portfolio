export class CreateProjectDto {
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

export class UpdateProjectDto {
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  featured?: boolean;
  order?: number;
}
