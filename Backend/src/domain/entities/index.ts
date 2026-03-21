export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  authorId: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface RefreshToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
