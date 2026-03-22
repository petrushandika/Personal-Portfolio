import React from 'react';

interface AboutProps {
  title?: string;
  content?: string;
}

export function About({
  title = 'About Me',
  content = `Hello! I'm Petrus Handika, a results-driven Full Stack Developer based in Jakarta, Indonesia. I enjoy creating things that live on the internet, from small passion projects to robust enterprise-level applications. My goal is always to build products that provide pixel-perfect, performant, and accessible experiences.

  With a strong foundation in modern tools like React, Astro, and NestJS, I have had the opportunity to develop complex, full-scale web platforms from scratch. I love tackling difficult problems, learning new technologies, and turning ideas into reality through clean, scalable code.`,
}: AboutProps) {
  const paragraphs = content.split('\n\n').filter(Boolean);

  const skills = [
    { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
    { name: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis'] },
    { name: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma'] },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="w-full mx-auto">
          {/* Consistent Section Header */}
          <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end gap-6 border-b border-white/10 pb-6">
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
                <div className="flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full backdrop-blur-md">
                  <svg
                    className="w-4 h-4 text-accent-400"
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
                  <span className="text-sm text-accent-100 font-medium">
                    Available for freelance
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Skills */}
            <div className="space-y-8 glass-panel p-8 md:p-10 border border-brand-500/20 shadow-[0_0_30px_rgba(99,102,241,0.05)]">
              <h3 className="text-xl font-bold text-gray-100 mb-6 font-mono border-b border-white/10 pb-4">
                &gt; Technical Arsenal
              </h3>
              {skills.map((category) => (
                <div key={category.name}>
                  <h4 className="text-sm font-semibold text-brand-300 mb-4 tracking-wider uppercase">
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-[#0A0A1F] text-gray-300 text-sm font-medium rounded-lg border border-white/10 hover-glow transition-all duration-300 cursor-default shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
