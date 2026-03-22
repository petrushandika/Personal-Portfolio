export class CreateArticleDto {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots?: string;
  schemaMarkup?: Record<string, unknown>;
  publishedAt?: string | Date;
}

export class UpdateArticleDto {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  status?: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots?: string;
  schemaMarkup?: Record<string, unknown>;
  publishedAt?: string | Date;
}

export class PaginationDto {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}
