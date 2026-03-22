ALTER TABLE "articles" ADD COLUMN "og_image" varchar(500);--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "canonical_url" varchar(500);--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "robots" varchar(100) DEFAULT 'index,follow';--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "schema_markup" json;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "tech_stack_icons" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "thumbnail" varchar(500);