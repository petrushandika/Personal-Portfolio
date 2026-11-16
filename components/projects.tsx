'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './projects.css';

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  stack: string[];
  contributions: string[];
  limitations: string[];
  repository?: string;
  captureStatus: string;
  workType: string;
  organization: string;
  commits: { sha: string; url?: string; summary: string; author: string; scope: string }[];
  images: { src: string; alt: string; caption: string; evidence: { kind: string; note: string; commitShas: string[] } }[];
  revision: string;
  runtime: string;
  modules?: { name: string; kind: string; description: string; contribution?: string; sha?: string; image?: string; sourceRevision?: string; commitShas: string[] }[];
  accent?: string;
};

// Evidence URLs are supplied by the caller, never inferred from a SHA.
function externalUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? value : undefined;
  } catch {
    return undefined;
  }
}

function ImageEvidence({ image }: { image: Project['images'][number] }) {
  return <details className="project-image-evidence"><summary>{image.evidence.kind === 'contribution' ? 'Contribution-linked screen' : 'Application context'} · Commit evidence</summary><p>{image.evidence.note}</p><ul>{image.evidence.commitShas.map(sha => <li key={sha}><code>{sha}</code></li>)}</ul></details>;
}

function ScreenshotModal({ images, index, onChange, onClose }: {
  images: Project['images'];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  const image = images[index];

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const element = dialog.current;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return createPortal(
    <dialog ref={dialog} className="project-lightbox" aria-label="Expanded screenshot"
      aria-describedby={image.caption ? captionId : undefined}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          onChange((index + (event.key === 'ArrowRight' ? 1 : -1) + images.length) % images.length);
        }
      }}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="project-lightbox__content">
        <div className="project-lightbox__toolbar">
          <span aria-live="polite">{index + 1} / {images.length}</span>
          {images.length > 1 && <div className="project-controls">
            <button type="button" aria-label="Previous screenshot" onClick={() => onChange((index - 1 + images.length) % images.length)}>←</button>
            <button type="button" aria-label="Next screenshot" onClick={() => onChange((index + 1) % images.length)}>→</button>
          </div>}
          <button type="button" className="project-lightbox__close" onClick={onClose} autoFocus>Close <span aria-hidden="true">×</span></button>
        </div>
        <figure>
          <img src={image.src} alt={image.alt} />
          {image.caption && <figcaption id={captionId}>{image.caption}<ImageEvidence image={image} /></figcaption>}
        </figure>
      </div>
    </dialog>, document.body,
  );
}

export function ProjectPage({ project }: { project: Project }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const titleId = useId();
  const moduleId = useId();
  const filmstrip = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const repository = externalUrl(project.repository);
  const modules = project.modules ?? [];
  const activeModule = modules[moduleIndex];
  const selectedImage = project.images[selectedIndex];
  const moduleImage = activeModule?.image ? project.images.find((image) => image.src === activeModule.image) : undefined;
  const accent = project.accent ?? (project.slug.includes('14day') ? '#176a59' : project.slug.includes('astronacci') ? '#a72e36' : '#354f78');

  const reveal = (delay = 0) => ({
    initial: false as const,
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay },
  });

  function selectImage(index: number) {
    setSelectedIndex(index);
    const strip = filmstrip.current;
    const frame = strip?.querySelectorAll<HTMLElement>('.project-screenshot')[index - 1];
    if (strip && frame) {
      const left = frame.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
      strip.scrollTo({ left: left - (strip.clientWidth - frame.clientWidth) / 2, behavior: reducedMotion ? 'instant' : 'smooth' });
    }
  }

  function screenshot(image: Project['images'][number], index: number) {
    return (
      <figure className={`project-card project-screenshot${index === 0 ? ' project-screenshot--hero' : ''}${selectedIndex === index ? ' is-selected' : ''}`} key={`${image.src}-${index}`}>
        {index === 0 && <div className="project-browser" aria-hidden="true"><span className="project-browser__dots"><i /><i /><i /></span><span>{project.title} / product view</span><span>↗</span></div>}
        <button type="button" className="project-screenshot__button" aria-label={`Expand screenshot: ${image.alt}`} aria-haspopup="dialog"
          onFocus={() => setSelectedIndex(index)} onClick={() => { setSelectedIndex(index); setExpandedIndex(index); }}>
          <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
          <span className="project-screenshot__hint" aria-hidden="true">View full screen ↗</span>
        </button>
        {image.caption && <figcaption><span className="project-image-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{image.caption}</figcaption>}
        <ImageEvidence image={image} />
      </figure>
    );
  }

  return (
    <main className="project-page" data-project={project.slug} aria-labelledby={titleId} style={{ '--project-accent': accent } as CSSProperties}>
      <div className="project-shell">
        <nav className="project-topline" aria-label="Case study navigation"><a className="project-back" href="/work/"><span aria-hidden="true">←</span> Back to Projects</a><span className="project-edition">Selected work / Case study</span></nav>
        <div className="project-grid">
          <section className="project-intro">
            <div><p className="project-eyebrow"><span className="project-status-dot" />{project.category}</p><h1 id={titleId}>{project.title}<span className="project-title-dot">.</span></h1><p className="project-summary">{project.summary}</p></div>
            <div className="project-role"><p className="project-eyebrow">My role</p><p>{project.role}</p>{repository && <a className="project-link" href={repository} target="_blank" rel="noopener noreferrer">Repository <span aria-hidden="true">↗</span><span className="project-sr-only"> (opens in a new tab)</span></a>}</div>
          </section>

          {project.images[0] && <motion.div className="project-hero-stage" {...reveal()}>{screenshot(project.images[0], 0)}<div className="project-hero-note"><span>01 / Application preview</span><span>Actual application capture ↗</span></div></motion.div>}

          {project.captureStatus === 'source-only' && <section className="project-source-study" aria-label="Source-reviewed contribution"><p className="project-eyebrow">Source-reviewed work · {project.organization}</p><h2>Code changes<span>.</span></h2><p>{project.summary}</p><div className="project-source-study__facts"><span>{project.commits.length} author-matched commit references</span><span>No runtime capture published</span></div></section>}

          {activeModule && <motion.section className="project-modules" {...reveal()} aria-labelledby={`${moduleId}-heading`}>
            <div className="project-section-heading"><div><p className="project-eyebrow">Projects</p><h2 id={`${moduleId}-heading`}>Related applications<span>.</span></h2></div><span className="project-section-index">01 — Explore</span></div>
            <div className="project-module-layout">
              <div className="project-module-tabs" role="tablist" aria-label="Brand products" aria-orientation="vertical">
                {modules.map((module, index) => <button type="button" role="tab" key={`${module.name}-${index}`} id={`${moduleId}-tab-${index}`} aria-controls={`${moduleId}-panel`} aria-selected={moduleIndex === index} tabIndex={moduleIndex === index ? 0 : -1}
                  onClick={() => setModuleIndex(index)} onKeyDown={(event) => {
                    let next = index;
                    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') next = (index + (event.key === 'ArrowDown' ? 1 : -1) + modules.length) % modules.length;
                    else if (event.key === 'Home') next = 0;
                    else if (event.key === 'End') next = modules.length - 1;
                    else return;
                    event.preventDefault(); setModuleIndex(next);
                    document.getElementById(`${moduleId}-tab-${next}`)?.focus();
                  }}><span className="project-module-number">{String(index + 1).padStart(2, '0')}</span><span><strong>{module.name}</strong><small>{module.kind}</small></span><span className="project-module-arrow" aria-hidden="true">↗</span></button>)}
              </div>
              <div className="project-module-panel" role="tabpanel" id={`${moduleId}-panel`} aria-labelledby={`${moduleId}-tab-${moduleIndex}`} tabIndex={0}>
                <motion.div key={moduleIndex} initial={moduleIndex === 0 ? false : { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
                  <p className="project-eyebrow">{activeModule.kind}</p><h3>{activeModule.name}</h3><p>{activeModule.description}</p>
                  {activeModule.contribution && <div className="project-module-contribution"><span className="project-eyebrow">My contribution</span><p>{activeModule.contribution}</p></div>}
                  {moduleImage && <button type="button" className="project-module-preview" aria-label={`Expand screenshot: ${moduleImage.alt}`} aria-haspopup="dialog" onClick={() => setExpandedIndex(project.images.indexOf(moduleImage))}><img src={moduleImage.src} alt={moduleImage.alt} loading="lazy" /><span>Explore screen ↗</span></button>}
                  <details className="project-module-source"><summary>My commits · {activeModule.commitShas.length} references</summary><ul>{project.commits.filter(c => activeModule.commitShas.includes(c.sha)).map(c => <li key={c.sha}><code>{c.sha}</code><p>{c.summary}</p></li>)}</ul>{activeModule.sourceRevision && <p>Audited repository revision (not necessarily my commit): <code>{activeModule.sourceRevision}</code></p>}</details>
                </motion.div>
              </div>
            </div>
          </motion.section>}

          <motion.section className="project-card project-contributions" {...reveal()}>
            <p className="project-eyebrow">The work behind the screen</p><h2>What I contributed<span>.</span></h2>
            {project.contributions.length > 0 ? <ul className="project-list">{project.contributions.map((item, index) => <li key={index}><span className="project-list-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{item}</span></li>)}</ul> : <p>Contribution details have not been supplied.</p>}
          </motion.section>
          <motion.section className="project-card project-stack" {...reveal(0.1)}><p className="project-eyebrow">Built with</p><h2>The toolkit<span>.</span></h2><ul className="project-tags">{project.stack.map((item, index) => <li key={index}>{item}</li>)}</ul><span className="project-stack-mark" aria-hidden="true">↗</span></motion.section>

          {project.images.length > 1 && <motion.section className="project-gallery" aria-label="Project screenshots" {...reveal()}>
            <div className="project-section-heading"><div><p className="project-eyebrow">Gallery</p><h2>Screenshots<span>.</span></h2></div><div className="project-controls"><button type="button" aria-label="Previous gallery screenshot" onClick={() => selectImage((selectedIndex - 1 + project.images.length) % project.images.length)}>←</button><span aria-live="polite">{String(selectedIndex + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span><button type="button" aria-label="Next gallery screenshot" onClick={() => selectImage((selectedIndex + 1) % project.images.length)}>→</button></div></div>
            {selectedImage && <figure className="project-gallery-selected"><button type="button" className="project-gallery-selected__button" aria-label={`Expand selected screenshot: ${selectedImage.alt}`} aria-haspopup="dialog" onClick={() => setExpandedIndex(selectedIndex)} onKeyDown={(event) => {
              if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); selectImage((selectedIndex + (event.key === 'ArrowRight' ? 1 : -1) + project.images.length) % project.images.length); }
            }}><img src={selectedImage.src} alt={selectedImage.alt} loading="lazy" /><span className="project-screenshot__hint" aria-hidden="true">View full screen ↗</span></button><figcaption><div>{selectedImage.caption}<ImageEvidence image={selectedImage} /></div><span>Use ← → to explore · Enter to expand</span></figcaption></figure>}
            <div className="project-filmstrip" ref={filmstrip}>{project.images.slice(1).map((image, index) => screenshot(image, index + 1))}</div>
            <p className="project-gallery-note">Scroll to browse. Focus a frame to preview; select to expand.</p>
          </motion.section>}

          <div className="project-capture-note"><span aria-hidden="true">↳</span><p>{project.captureStatus === 'source-only' ? 'Source evidence, not a runtime demonstration.' : 'Real application captures, not mockups.'} {project.limitations[0] ?? 'Screens show the captured revision; availability and data may differ from production.'}</p></div>
          <details className="project-evidence"><summary><span>Technical notes</span><span className="project-evidence-summary">Source evidence, runtime & caveats <span aria-hidden="true">＋</span></span></summary><div className="project-evidence-grid">
            <section><p className="project-eyebrow">Source evidence</p><h2>Commits & revision</h2><dl className="project-facts"><div><dt>Reference revision (capture details below)</dt><dd><code>{project.revision}</code></dd></div></dl>
              {project.commits.length > 0 ? <ul className="project-commits">{project.commits.map((commit, index) => {
                const url = externalUrl(commit.url);
                return <li key={`${commit.sha}-${index}`}>{url ? <a className="project-link" href={url} target="_blank" rel="noopener noreferrer"><code>{commit.sha}</code><span aria-hidden="true"> ↗</span><span className="project-sr-only"> (opens in a new tab)</span></a> : <code>{commit.sha}</code>}<p>{commit.summary}</p><small>Author: {commit.author}</small><p>{commit.scope}</p></li>;
              })}</ul> : <p>No commit evidence has been supplied.</p>}
            </section>
            <section className="project-runtime"><p className="project-eyebrow">Capture context</p><h2>Runtime & caveats</h2><p className="project-runtime__description">{project.runtime}</p>{project.limitations.length > 0 && <ul className="project-caveat-list">{project.limitations.map((item, index) => <li key={index}>{item}</li>)}</ul>}</section>
          </div></details>
        </div>
        <a className="project-back project-back--footer" href="/work/"><span aria-hidden="true">←</span> Back to Projects<span aria-hidden="true">↗</span></a>
      </div>
      {expandedIndex !== null && project.images[expandedIndex] && <ScreenshotModal images={project.images} index={expandedIndex} onChange={(index) => { setExpandedIndex(index); setSelectedIndex(index); }} onClose={() => setExpandedIndex(null)} />}
    </main>
  );
}

export default ProjectPage;
