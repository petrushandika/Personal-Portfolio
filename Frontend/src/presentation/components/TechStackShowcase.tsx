import React from 'react';

interface TechStackShowcaseProps {
  limit?: number;
}

const techStackList = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'JavaScript', icon: '📜' },
  { name: 'Python', icon: '🐍' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Redis', icon: '🔴' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📚' },
  { name: 'TailwindCSS', icon: '🎨' },
  { name: 'NestJS', icon: '🐱' },
];

export function TechStackShowcase({ limit = 8 }: TechStackShowcaseProps) {
  const displayTech = techStackList.slice(0, limit);

  return (
    <div className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            Technologies I Work With
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {displayTech.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-50 to-white rounded-full border border-gray-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-xl">{tech.icon}</span>
              <span className="text-sm font-semibold text-gray-700">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
