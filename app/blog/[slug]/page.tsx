import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import articles from '../../../data/articles.json';
import projects from '../../../data/projects.json';
import { JsonLd, OG_IMAGE, absolute, pageMetadata, SITE_URL } from '../../../lib/site';
import { RichText } from '../../../components/rich-text';
import '../../../components/content.css';

export const dynamicParams = false;
export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }

const find = (slug: string) => articles.find((a) => a.slug === slug);
const imageFor = (project?: typeof projects[number]) => project?.images[0];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = find((await params).slug);
  if (!article) return {};
  const image = imageFor(projects.find((p) => p.slug === article.project));
  const meta = pageMetadata({ title: `${article.title} | Petrus Handika`, description: article.description, path: `/blog/${article.slug}/`, type: 'article', publishedTime: article.published,
    ...(image ? { image: image.src, imageAlt: image.alt } : {}) });
  return { ...meta, openGraph: { ...meta.openGraph, locale: 'id_ID' } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = find((await params).slug);
  if (!article) notFound();
  const project = projects.find((p) => p.slug === article.project);
  const url = `${SITE_URL}/blog/${article.slug}/`;
  const image = imageFor(project);
  return (
    <main className="content-page">
      <JsonLd data={{ '@graph': [
        { '@type': 'BlogPosting', '@id': `${url}#article`, mainEntityOfPage: url, url, headline: article.title, description: article.description, inLanguage: 'id',
          datePublished: article.published, dateModified: article.published, image: absolute(image?.src ?? OG_IMAGE),
          author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Petrus Handika', url: `${SITE_URL}/` },
          ...(project ? { about: { '@type': 'CreativeWork', name: project.title, url: `${SITE_URL}/${project.slug}/` } } : {}),
          citation: article.sources.map((s) => s.url) },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Notes', item: `${SITE_URL}/blog/` },
          { '@type': 'ListItem', position: 3, name: article.title, item: url }] }] }} />
      <div className="content-shell content-shell--narrow">
        <nav className="content-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog/">Notes</Link></nav>
        <article lang="id">
          <header className="content-hero">
            <p className="content-eyebrow"><time dateTime={article.published}>{article.published}</time>{project && <> · <Link href={`/${project.slug}/`}>{project.title}</Link></>}</p>
            <h1>{article.title}</h1>
            <p className="content-lede">{article.description}</p>
          </header>
          {article.sections.map((section) => (
            <section className="content-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((text, i) => <p key={i}><RichText text={text} /></p>)}
            </section>
          ))}
          <section className="content-section content-sources">
            <h2>Sumber</h2>
            <ul>{article.sources.map((s) => <li key={s.url}><a className="content-link" href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></li>)}</ul>
          </section>
        </article>
        <footer className="content-footer">
          {project && <Link className="content-link" href={`/${project.slug}/`}>Lihat case study {project.title} →</Link>}
          <Link className="content-link" href="/blog/">Semua catatan →</Link>
        </footer>
      </div>
    </main>
  );
}
