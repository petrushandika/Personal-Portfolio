export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  status: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots?: string;
  schemaMarkup?: Record<string, unknown>;
  authorId: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface User {
  id: string;
  email: string;
  role: 'admin';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
