export interface BlogPost {
  cover_image?: string;
  published_at?: string;
  public_reactions_count?: number;
  comments_count?: number;
  url?: string;
  title?: string;
  reading_time_minutes?: number;
  description?: string;
  [key: string]: any;
}
