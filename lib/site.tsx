import type { Metadata } from 'next';

export const SITE_URL = 'https://petrushandika.com';
export const SITE_NAME = 'Petrus Handika';
export const OG_IMAGE = '/og/petrus-handika.jpg';

export const person = {
  name: 'Petrus Handika',
  jobTitle: 'Full Stack Developer (Web & AI)',
  email: 'petrushandikasinaga@gmail.com',
  country: 'Indonesia',
  sameAs: [
    'https://www.linkedin.com/in/petrushandika/',
    'https://github.com/petrushandika',
    'https://instagram.com/petrushandika',
    'https://twitter.com/petrushandika',
  ],
};

export function absolute(path: string) {
  return new URL(path, SITE_URL).toString();
}

/** One place for title, description, canonical and social previews of every indexable page. */
export function pageMetadata({ title, description, path, image = OG_IMAGE, imageAlt = 'Petrus Handika — Full Stack Developer', type = 'website', publishedTime }: {
  title: string; description: string; path: string; image?: string; imageAlt?: string; type?: 'website' | 'article'; publishedTime?: string;
}): Metadata {
  const url = absolute(path);
  const images = [{ url: absolute(image), alt: imageAlt }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { type, url, title, description, siteName: SITE_NAME, locale: 'en_US', images, ...(publishedTime ? { publishedTime } : {}) },
    twitter: { card: 'summary_large_image', title, description, images: images.map((i) => i.url) },
  };
}

export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: person.name,
    url: `${SITE_URL}/`,
    image: absolute(OG_IMAGE),
    jobTitle: person.jobTitle,
    email: `mailto:${person.email}`,
    address: { '@type': 'PostalAddress', addressCountry: 'ID' },
    knowsAbout: ['Full stack development', 'React', 'Next.js', 'TypeScript', 'Go', 'Node.js', 'PostgreSQL', 'AI engineering'],
    sameAs: person.sameAs,
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c') }} />;
}
