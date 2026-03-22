import React, { useEffect, useState } from 'react';
import { apiClient } from '../../../infrastructure/api/api';
import type { Article } from '../../../core/entities/article';

interface ArticlesShowcaseProps {
  limit?: number;
}

export function ArticlesShowcase({ limit = 3 }: ArticlesShowcaseProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await apiClient.get<{ data: Article[] }>(
          '/articles?status=published&limit=' + limit
        );
        setArticles(response.data.slice(0, limit));
      } catch (err) {
        setError('Failed to load articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [limit]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Draft';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="animate-pulse glass-panel p-4">
            <div className="bg-white/5 rounded-2xl h-40 mb-4 border border-white/10" />
            <div className="bg-white/5 rounded-lg h-4 w-1/4 mb-4" />
            <div className="bg-white/5 rounded-lg h-6 w-3/4 mb-3" />
            <div className="bg-white/5 rounded-lg h-4 w-full mb-2" />
          </div>
        ))}
      </div>
    );
  }

  if (error || articles.length === 0) {
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-gray-300 font-medium">No articles available yet.</p>
        <p className="text-sm text-gray-500 mt-1">Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <article
          key={article.id}
          className="group glass-panel overflow-hidden hover-glow flex flex-col h-full"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-[#0A0A1F] border-b border-white/5">
            {article.featuredImage ? (
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-900/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_70%)]" />
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2 z-10 border border-white/10">
                  <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                    📝
                  </span>
                </div>
                <span className="text-sm font-mono text-brand-300 z-10">[ Article Cover ]</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-[#0A0A1F]/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <time className="text-sm text-brand-400 mb-3 block font-mono">
              {formatDate(article.publishedAt)}
            </time>

            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-400 transition-colors line-clamp-2 drop-shadow-sm">
              <a href={`/blog/${article.slug}`}>{article.title}</a>
            </h3>

            <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1 font-light leading-relaxed">
              {article.excerpt}
            </p>

            <div className="mt-auto pt-4 border-t border-white/10">
              <a
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-brand-400 hover:text-accent-400 text-sm font-medium transition-colors group/link"
              >
                Read Article
                <svg
                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
