import React from 'react';

interface AboutProps {
  title?: string;
  content?: string;
}

export function About({
  title = 'About Me',
  content = `I'm Petrus Handika, a Full Stack Developer based in Jakarta, Indonesia. I specialize in building modern web applications with a focus on clean code and exceptional user experiences. With strong foundations in React, Node.js, and various modern technologies, I transform ideas into functional digital products.`,
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
      <div className="container mx-auto relative z-10">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left - Content */}
            <div className="space-y-4 lg:space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg text-gray-400 leading-relaxed font-light"
                >
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="glass-panel border border-white/10 p-4 md:p-6 text-center"
                  >
                    <div className="text-xl md:text-3xl font-bold text-brand-400 mb-1">
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
