import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5432/portfolio',
  },
  verbose: true,
  strict: true,
});