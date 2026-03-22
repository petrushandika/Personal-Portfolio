import React from 'react';
import StackIcon from 'tech-stack-icons';

interface TechStackShowcaseProps {
  limit?: number;
}

const techStackList: { name: string; icon: string }[] = [
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'Python', icon: 'python' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Redis', icon: 'redis' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Git', icon: 'git' },
  { name: 'TailwindCSS', icon: 'tailwindcss' },
  { name: 'NestJS', icon: 'nestjs' },
];

export function TechStackShowcase() {
  const displayTech = techStackList;

  return (
    <div className="py-16 relative z-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-brand-400/80 uppercase tracking-widest">
            Technologies I Work With
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-5">
          {displayTech.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-5 py-3 glass-panel hover:bg-white/10 hover-glow cursor-default transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <StackIcon
                  name={tech.icon as any}
                  className={`w-full h-full object-contain ${
                    ['nextjs', 'github', 'nestjs'].indexOf(tech.icon) !== -1
                      ? 'filter brightness-0 invert opacity-90'
                      : ''
                  }`}
                />
              </div>
              <span className="text-sm font-semibold text-gray-200">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
