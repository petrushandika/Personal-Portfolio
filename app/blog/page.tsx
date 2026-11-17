import Link from 'next/link';
import articles from '../../data/articles.json';
import projects from '../../data/projects.json';
import { JsonLd, pageMetadata, SITE_URL } from '../../lib/site';
import '../../components/content.css';

export const metadata = pageMetadata({
  title: 'Engineering Notes | Petrus Handika',
  description: 'Engineering notes by Petrus Handika about UI fixes, data rules and features in his projects, each tied to a public commit.',
  path: '/blog/',
});

const sorted = [...articles].sort((a, b) => b.published.localeCompare(a.published));

export default function BlogIndex() {
  return (
    <main className="content-page">
      <JsonLd data={{ '@type': 'Blog', '@id': `${SITE_URL}/blog/#blog`, url: `${SITE_URL}/blog/`, name: 'Engineering Notes', author: { '@id': `${SITE_URL}/#person` },
        blogPost: sorted.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: `${SITE_URL}/blog/${a.slug}/`, datePublished: a.published })) }} />
      <div className="content-shell">
        <nav className="content-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Notes</span></nav>
        <header className="content-hero">
          <p className="content-eyebrow">Notes</p>
          <h1>Engineering notes<span>.</span></h1>
          <p className="content-lede">Short write-ups on changes in my projects. Each note links the commit it describes.</p>
        </header>
        <ul className="content-cards content-cards--wide">
          {sorted.map((a) => {
            const project = projects.find((p) => p.slug === a.project);
            return <li key={a.slug} lang="id"><Link href={`/blog/${a.slug}/`}><span>{a.published}{project ? ` · ${project.title}` : ''}</span><strong>{a.title}</strong><p>{a.description}</p></Link></li>;
          })}
        </ul>
      </div>
    </main>
  );
}
