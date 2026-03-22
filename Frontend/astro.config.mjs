import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  srcDir: './src/presentation',
  integrations: [react(), sitemap()],
  vite: {
    ssr: {
      external: ['@astrojs/node'],
    },
  },
});
