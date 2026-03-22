import React from 'react';
import StackIcon from 'tech-stack-icons';

export const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['reactjs', 'nextjs', 'vuejs', 'svelte', 'typescript', 'javascript', 'tailwindcss'],
    },
    {
      title: 'Backend & DB',
      skills: ['nodejs', 'express', 'nestjs', 'golang', 'laravel', 'postgresql', 'mysql', 'oracle'],
    },
    {
      title: 'Data & AI',
      skills: ['python', 'tensorflow', 'scikitlearn', 'langchain', 'jupyter'],
    },
    {
      title: 'Tools & DevOps',
      skills: ['git', 'docker', 'npm', 'vscode', 'figma'],
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="text-left items-start md:items-end mb-16 flex flex-col md:flex-row gap-6 border-b border-white/10 pb-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight flex items-center gap-4">
          <span className="text-brand-400 font-mono text-xl md:text-2xl font-normal">01.</span>
          Skills & Technologies
        </h2>
        <div className="hidden md:block w-px h-8 bg-white/10 ml-4" />
        <span className="text-brand-400 font-mono text-sm tracking-wide">Things I'm good at</span>
      </div>

      <div className="flex flex-col gap-12">
        {skillCategories.map((category, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 pb-8 border-b border-white/[0.03] last:border-0"
          >
            <div className="md:w-48 shrink-0">
              <h3 className="text-lg font-bold font-mono text-brand-300 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 flex-1">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className="group flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white/[0.03] border border-white/10 hover:border-brand-500/40 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:-translate-y-0.5 cursor-default"
                >
                  <StackIcon
                    name={skill as any}
                    className="w-5 h-5 filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                  />
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white capitalize transition-colors duration-300">
                    {skill === 'reactjs'
                      ? 'React'
                      : skill === 'nextjs'
                        ? 'Next.js'
                        : skill.replace('js', '.js')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
