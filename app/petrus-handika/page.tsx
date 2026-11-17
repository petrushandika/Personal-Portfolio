import Link from 'next/link';
import projects from '../../data/projects.json';
import articles from '../../data/articles.json';
import { JsonLd, pageMetadata, person, personJsonLd, SITE_URL } from '../../lib/site';
import '../../components/content.css';

export const metadata = pageMetadata({
  title: 'Petrus Handika — Full Stack Developer in Indonesia',
  description: 'Profile of Petrus Handika, a full stack developer in Indonesia working on React, Next.js, Go, Node.js and AI workflows. Personal projects, company work and contact details.',
  path: '/petrus-handika/',
});

const groups = [
  { kind: 'personal', title: 'Personal projects' },
  { kind: 'organization', title: 'Company work' },
];
const socialLabel = (url: string) => ({ 'www.linkedin.com': 'LinkedIn', 'github.com': 'GitHub', 'instagram.com': 'Instagram', 'twitter.com': 'X (Twitter)' } as Record<string, string>)[new URL(url).hostname] ?? new URL(url).hostname;

export default function ProfilePage() {
  return (
    <main className="content-page">
      <JsonLd data={{ '@graph': [personJsonLd(), { '@type': 'ProfilePage', '@id': `${SITE_URL}/petrus-handika/#page`, url: `${SITE_URL}/petrus-handika/`, name: 'Petrus Handika', mainEntity: { '@id': `${SITE_URL}/#person` } }] }} />
      <div className="content-shell">
        <nav className="content-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Profile</span></nav>
        <header className="content-hero">
          <p className="content-eyebrow">Profile</p>
          <h1>Petrus Handika<span>.</span></h1>
          <p className="content-lede">Full stack developer based in Indonesia, building across interfaces, APIs and data, with a focus on practical software, maintainable code and AI-assisted workflows.</p>
        </header>

        <section className="content-section" aria-labelledby="toolkit">
          <h2 id="toolkit">Technical toolkit</h2>
          <ul className="content-list">
            <li><strong>Frontend:</strong> React, Next.js, Vue, TypeScript, JavaScript, HTML, CSS and Tailwind CSS.</li>
            <li><strong>Backend:</strong> Go, Node.js, Express, NestJS and Python.</li>
            <li><strong>Data and tools:</strong> PostgreSQL, MySQL, Prisma, Git, GitHub and Figma.</li>
          </ul>
        </section>

        <section className="content-section" aria-labelledby="experience">
          <h2 id="experience">Experience</h2>
          <p>Full stack development at Astronacci International and 14DAYPILOT Flight Academy, web development at PT Estetindo Global Indonesia, and a machine learning cohort at Coding Camp powered by DBS Foundation.</p>
        </section>

        {groups.map((group) => (
          <section className="content-section" key={group.kind} aria-labelledby={`projects-${group.kind}`}>
            <h2 id={`projects-${group.kind}`}>{group.title}</h2>
            <ul className="content-cards">
              {projects.filter((p) => p.workType === group.kind).map((p) => (
                <li key={p.slug}><Link href={`/${p.slug}/`}><strong>{p.title}</strong><span>{p.category}</span><p>{p.summary}</p></Link></li>
              ))}
            </ul>
          </section>
        ))}

        <section className="content-section" aria-labelledby="notes">
          <h2 id="notes">Engineering notes</h2>
          <ul className="content-cards">
            {articles.map((a) => <li key={a.slug} lang="id"><Link href={`/blog/${a.slug}/`}><strong>{a.title}</strong><span>{a.published}</span><p>{a.description}</p></Link></li>)}
          </ul>
          <p className="content-more"><Link className="content-link" href="/blog/">All notes →</Link></p>
        </section>

        <section className="content-section" aria-labelledby="contact">
          <h2 id="contact">Contact</h2>
          <p>Email: <a className="content-link" href={`mailto:${person.email}`}>{person.email}</a></p>
          <ul className="content-inline">
            {person.sameAs.map((url) => <li key={url}><a className="content-link" href={url} rel="me noopener noreferrer" target="_blank">{socialLabel(url)}</a></li>)}
            <li><a className="content-link" href="/Resume/Petrus%20Handika.pdf">Resume (PDF)</a></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
