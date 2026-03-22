import { ExternalLink, Github, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../infrastructure/api/api';
import type { Project } from '../../core/entities/project';

interface ProjectsShowcaseProps {
  limit?: number;
  featured?: boolean;
}

export function ProjectsShowcase({ limit = 6, featured = true }: ProjectsShowcaseProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const endpoint = featured ? `/projects?featured=true` : '/projects';
        const data = await apiClient.get<Project[]>(endpoint);
        setProjects(data.slice(0, limit));
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [limit, featured]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="animate-pulse glass-panel p-4">
            <div className="bg-white/5 rounded-2xl h-48 mb-4 border border-white/10" />
            <div className="bg-white/5 rounded-lg h-6 w-3/4 mb-3" />
            <div className="bg-white/5 rounded-lg h-4 w-full mb-2" />
            <div className="bg-white/5 rounded-lg h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error || projects.length === 0) {
    return (
      <div className="text-center py-16 glass-panel border border-dashed border-brand-500/20">
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-brand-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <p className="text-gray-300 font-medium">No projects available yet.</p>
        <p className="text-sm text-gray-500 mt-1">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <article
          key={project.id}
          className="group glass-panel overflow-hidden hover-glow flex flex-col h-full"
        >
          {/* Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden bg-[#0A0A1F] border-b border-white/5">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-900/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_70%)]" />
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2 z-10 border border-white/10">
                  <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                    🚀
                  </span>
                </div>
                <span className="text-sm font-mono text-brand-300 z-10">[ Project Preview ]</span>
              </div>
            )}

            {project.featured && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-black/50 backdrop-blur-md border border-brand-500/30 text-white text-xs font-semibold rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                <Star className="w-3.5 h-3.5 text-brand-400 fill-brand-400" />
                Featured
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-[#0A0A1F]/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors drop-shadow-sm">
              {project.title}
            </h3>

            <p className="text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed flex-1 font-light">
              {project.description}
            </p>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 text-brand-300 text-xs font-mono rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-500 text-xs font-mono rounded-md">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group/link"
                >
                  <Github className="w-4 h-4 group-hover/link:text-brand-400" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group/link"
                >
                  <ExternalLink className="w-4 h-4 group-hover/link:text-accent-400" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
