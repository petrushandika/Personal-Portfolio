export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string | null;
  status: 'draft' | 'published';
  categoryId?: string | null;
  tags: string[];
  readingTime?: number | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
  robots?: string | null;
  schemaMarkup?: Record<string, unknown> | null;
  authorId: string;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleWithAuthor extends Article {
  author?: {
    id: string;
    name: string | null;
    avatar: string | null;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
  } | null;
}