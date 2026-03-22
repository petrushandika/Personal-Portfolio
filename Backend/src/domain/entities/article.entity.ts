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
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}