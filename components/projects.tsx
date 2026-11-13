'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  commits: { sha: string; url?: string; summary: string }[];
  images: { src: string; alt: string; caption: string }[];
  revision: string;
  runtime: string;
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

function ScreenshotModal({ image, onClose }: {
  image: Project['images'][number];
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const captionId = useId();

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
    <dialog
      ref={dialog}
      className="project-lightbox"
      aria-label="Expanded screenshot"
      aria-describedby={image.caption ? captionId : undefined}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="project-lightbox__content">
        <button type="button" className="project-lightbox__close" onClick={onClose} autoFocus>
          Close <span aria-hidden="true">×</span>
        </button>
        <figure>
          <img src={image.src} alt={image.alt} />
          {image.caption && <figcaption id={captionId}>{image.caption}</figcaption>}
        </figure>
      </div>
    </dialog>,
    document.body,
  );
}

export function ProjectPage({ project }: { project: Project }) {
  const [expandedImage, setExpandedImage] = useState<Project['images'][number] | null>(null);
  const titleId = useId();
  const repository = externalUrl(project.repository);

  function screenshot(image: Project['images'][number], index: number) {
    return (
      <figure className={`project-card project-screenshot${index === 0 ? ' project-screenshot--hero' : ''}`} key={`${image.src}-${index}`}>
        <button
          type="button"
          className="project-screenshot__button"
          aria-label={`Expand screenshot: ${image.alt}`}
          aria-haspopup="dialog"
          onClick={() => setExpandedImage(image)}
        >
          <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
          <span className="project-screenshot__hint" aria-hidden="true">Expand ↗</span>
        </button>
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
    );
  }

  return (
    <main className="project-page" data-project={project.slug} aria-labelledby={titleId}>
      <div className="project-shell">
        <a className="project-back" href="/#works"><span aria-hidden="true">←</span> Back to Projects</a>
        <div className="project-grid">
          <section className="project-card project-intro">
            <div>
              <p className="project-eyebrow">{project.category}</p>
              <h1 id={titleId}>{project.title}</h1>
              <p className="project-summary">{project.summary}</p>
            </div>
            <div className="project-role">
              <p className="project-eyebrow">My role</p>
              <p>{project.role}</p>
              {repository && <a className="project-link" href={repository} target="_blank" rel="noopener noreferrer">Repository <span aria-hidden="true">↗</span><span className="project-sr-only"> (opens in a new tab)</span></a>}
            </div>
          </section>

          {project.images[0] && screenshot(project.images[0], 0)}

          <section className="project-card project-contributions">
            <p className="project-eyebrow">Contribution scope</p>
            <h2>What I contributed</h2>
            {project.contributions.length > 0 ? (
              <ul className="project-list">{project.contributions.map((item, index) => <li key={index}>{item}</li>)}</ul>
            ) : <p>Contribution details have not been supplied.</p>}
          </section>

          <section className="project-card project-stack">
            <p className="project-eyebrow">Tools & technologies</p>
            <h2>Tech stack</h2>
            <ul className="project-tags">{project.stack.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </section>

          {project.images.length > 1 && (
            <section className="project-gallery" aria-label="Project screenshots">
              {project.images.slice(1).map((image, index) => screenshot(image, index + 1))}
            </section>
          )}

          <section className="project-card project-evidence">
            <p className="project-eyebrow">Source evidence</p>
            <h2>Commits & revision</h2>
            <dl className="project-facts"><div><dt>Captured revision</dt><dd><code>{project.revision}</code></dd></div></dl>
            {project.commits.length > 0 ? (
              <ul className="project-commits">
                {project.commits.map((commit, index) => {
                  const url = externalUrl(commit.url);
                  return <li key={`${commit.sha}-${index}`}>
                    {url ? <a className="project-link" href={url} target="_blank" rel="noopener noreferrer"><code>{commit.sha}</code><span aria-hidden="true"> ↗</span><span className="project-sr-only"> (opens in a new tab)</span></a> : <code>{commit.sha}</code>}
                    <p>{commit.summary}</p>
                  </li>;
                })}
              </ul>
            ) : <p>No commit evidence has been supplied.</p>}
          </section>

          <section className="project-card project-runtime">
            <p className="project-eyebrow">Capture context</p>
            <h2>Runtime & caveats</h2>
            <p className="project-runtime__description">{project.runtime}</p>
            {project.limitations.length > 0 && <ul className="project-list">{project.limitations.map((item, index) => <li key={index}>{item}</li>)}</ul>}
          </section>
        </div>
        <a className="project-back project-back--footer" href="/#works"><span aria-hidden="true">←</span> Back to Projects</a>
      </div>
      {expandedImage && <ScreenshotModal image={expandedImage} onClose={() => setExpandedImage(null)} />}
    </main>
  );
}

export default ProjectPage;
