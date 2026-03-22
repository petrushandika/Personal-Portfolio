import React, { useEffect, useState } from 'react';
import type { Article } from '../../core/entities/article';
import { apiClient } from '../../infrastructure/api/api';

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
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl h-64" />
          </div>
        ))}
      </div>
    );
  }

  if (error || articles.length === 0) {
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-gray-500">No articles available yet.</p>
        <p className="text-sm text-gray-400 mt-1">Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {articles.map((article) => (
        <article
          key={article.id}
          className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2"
        >
          {/* Image */}
          <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary-100 to-purple-100">
            {article.featuredImage ? (
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-5xl">📝</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <time className="text-sm text-gray-500 mb-2 block">
              {formatDate(article.publishedAt)}
            </time>

            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
              <a href={`/blog/${article.slug}`}>{article.title}</a>
            </h3>

            <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
