import { ExternalLink, Github, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { Project } from '../../core/entities/project';
import { apiClient } from '../../infrastructure/api/api';

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
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl h-80" />
          </div>
        ))}
      </div>
    );
  }

  if (error || projects.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
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
        <p className="text-gray-500">No projects available yet.</p>
        <p className="text-sm text-gray-400 mt-1">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <article
          key={project.id}
          className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-purple-100">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl">🚀</span>
              </div>
            )}

            {project.featured && (
              <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-medium rounded-full">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
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
