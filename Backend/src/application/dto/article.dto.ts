import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty({ message: 'Slug is required' })
  @MaxLength(255)
  @Transform(({ value }) => value?.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255)
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Excerpt is required' })
  @Transform(({ value }) => value?.trim())
  excerpt: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  featuredImage?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(60, { message: 'Meta title should be max 60 characters for optimal SEO' })
  metaTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160, { message: 'Meta description should be max 160 characters for optimal SEO' })
  metaDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  ogImage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  canonicalUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  robots?: string;

  @IsOptional()
  @IsObject()
  schemaMarkup?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  publishedAt?: string;
}

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value?.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  excerpt?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  featuredImage?: string;

  @IsOptional()
  @IsEnum(['draft', 'published'], { message: 'Status must be either draft or published' })
  status?: 'draft' | 'published';

  @IsOptional()
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(60, { message: 'Meta title should be max 60 characters for optimal SEO' })
  metaTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160, { message: 'Meta description should be max 160 characters for optimal SEO' })
  metaDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  ogImage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  canonicalUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  robots?: string;

  @IsOptional()
  @IsObject()
  schemaMarkup?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  publishedAt?: string;
}

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  tag?: string;
}
