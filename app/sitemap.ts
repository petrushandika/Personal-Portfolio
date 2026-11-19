import type { MetadataRoute } from 'next';
import projects from '../data/projects.json';
import articles from '../data/articles.json';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = articles.map((a) => a.published).sort().at(-1);
  const built = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: latest, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/petrus-handika/`, lastModified: latest, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((p) => ({ url: `${SITE_URL}/${p.slug}/`, lastModified: built, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${SITE_URL}/blog/`, lastModified: latest, changeFrequency: 'weekly', priority: 0.7 },
    ...articles.map((a) => ({ url: `${SITE_URL}/blog/${a.slug}/`, lastModified: a.published, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}