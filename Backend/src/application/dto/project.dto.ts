import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class TechStackIconDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}

export class CreateProjectDto {
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
  @IsNotEmpty({ message: 'Description is required' })
  @Transform(({ value }) => value?.trim())
  description: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechStackIconDto)
  techStackIcons?: TechStackIconDto[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  githubUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  liveUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  thumbnail?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;

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
}

export class UpdateProjectDto {
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
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechStackIconDto)
  techStackIcons?: TechStackIconDto[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  githubUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  liveUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  thumbnail?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;

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
}
