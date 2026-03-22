import React from 'react';

interface AboutProps {
  title?: string;
  content?: string;
}

export function About({
  title = 'About Me',
  content = `Hello! I'm Petrus Handika, a results-driven Full Stack Developer based in Jakarta, Indonesia. I enjoy creating things that live on the internet, from small passion projects to robust enterprise-level applications. My goal is always to build products that provide pixel-perfect, performant, and accessible experiences.

With a strong foundation in modern web technologies, I have had the opportunity to develop complex, full-scale web platforms from scratch. I love tackling difficult problems, learning new technologies, and turning ideas into reality through clean, scalable code.`,
}: AboutProps) {
  const paragraphs = content.split('\n\n').filter(Boolean);

  const highlights = [
    { label: 'Experience', value: '2+ Years' },
    { label: 'Projects', value: '15+' },
    { label: 'Technologies', value: '20+' },
  ];

  const interests = [
    'Full Stack Development',
    'Machine Learning & AI',
    'System Design',
    'Open Source',
  ];

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="w-full mx-auto">
          {/* Consistent Section Header */}
          <div className="text-left items-start md:items-end mb-16 flex flex-col md:flex-row gap-6 border-b border-white/10 pb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight flex items-center gap-4">
              <span className="text-brand-400 font-mono text-xl md:text-2xl font-normal">01.</span>
              {title}
            </h2>
            <div className="hidden md:block w-px h-8 bg-white/10 ml-4" />
            <span className="text-brand-400 font-mono text-sm tracking-wide">Who am I?</span>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left - Content */}
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-400 leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}

              {/* Location & Availability */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                  <svg
                    className="w-4 h-4 text-brand-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-300 font-medium">Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-300 font-medium">Available for freelance</span>
                </div>
              </div>
            </div>

            {/* Right - Summary */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="glass-panel border border-white/10 p-6 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-brand-400 mb-1">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interests */}
              <div className="glass-panel border border-white/5 shadow-2xl p-6">
                <h3 className="text-lg font-bold text-gray-100 mb-4 font-mono border-b border-white/10 pb-3">
                  &gt; Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 bg-white/5 text-gray-300 text-sm rounded-lg border border-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
