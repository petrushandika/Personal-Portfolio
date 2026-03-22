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