import React from 'react';
import StackIcon from 'tech-stack-icons';

export const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { id: 'reactjs', name: 'React' },
        { id: 'nextjs', name: 'Next.js' },
        { id: 'typescript', name: 'TypeScript' },
        { id: 'javascript', name: 'JavaScript' },
        { id: 'tailwindcss', name: 'Tailwind CSS' },
        { id: 'html5', name: 'HTML5' },
        { id: 'css3', name: 'CSS3' },
        { id: 'redux', name: 'Redux' },
        { id: 'shadcn', name: 'Shadcn UI' },
        { id: 'zustand', name: 'Zustand' },
        { id: 'reactnative', name: 'React Native' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { id: 'nodejs', name: 'Node.js' },
        { id: 'nestjs', name: 'Nest.js' },
        { id: 'express', name: 'Express.js' },
        { id: 'laravel', name: 'Laravel' },
        { id: 'php', name: 'PHP' },
        { id: 'golang', name: 'Go' },
        { id: 'gin', name: 'Gin' },
        { id: 'gorm', name: 'GORM' },
        { id: 'prisma', name: 'Prisma ORM' },
        { id: 'elysia', name: 'Elysia.js' },
      ],
    },
    {
      title: 'Database',
      skills: [
        { id: 'postgresql', name: 'PostgreSQL' },
        { id: 'mysql', name: 'MySQL' },
        { id: 'mongodb', name: 'MongoDB' },
        { id: 'redis', name: 'Redis' },
      ],
    },
    {
      title: 'AI & Data',
      skills: [
        { id: 'python', name: 'Python' },
        { id: 'tensorflow', name: 'TensorFlow' },
        { id: 'scikitlearn', name: 'Scikit-learn' },
        { id: 'langchain', name: 'LangChain' },
        { id: 'jupyter', name: 'Jupyter' },
      ],
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { id: 'docker', name: 'Docker' },
        { id: 'git', name: 'Git' },
        { id: 'github', name: 'GitHub' },
        { id: 'linux', name: 'Linux' },
        { id: 'figma', name: 'Figma' },
        { id: 'wordpress', name: 'WordPress' },
        { id: 'vercel', name: 'Vercel' },
        { id: 'aws', name: 'AWS' },
        { id: 'nginx', name: 'Nginx' },
      ],
    },
  ];

  const SkillBadge = ({ skill }: { skill: { id: string; name: string } }) => (
    <div className="group flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-white/[0.03] border border-white/10 hover:border-brand-500/40 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:-translate-y-0.5 cursor-default shrink-0">
      <StackIcon
        name={skill.id as any}
        className="w-5 h-5 filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
      />
      <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );

  const SkillRow = ({ category }: { category: (typeof skillCategories)[0] }) => {
    const allSkills = [...category.skills, ...category.skills];

    return (
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-3 md:py-4 border-b border-white/[0.03] last:border-0">
        <h3 className="text-base md:text-lg font-bold font-mono text-brand-300 tracking-wide shrink-0 min-w-[120px] md:min-w-[160px] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          {category.title}
        </h3>
        <div className="relative overflow-hidden flex-1 w-full group">
          <div className="flex gap-4 animate-marquee">
            {allSkills.map((skill, i) => (
              <SkillBadge key={`${skill.id}-${i}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="flex flex-col gap-1">
        {skillCategories.map((category, idx) => (
          <SkillRow key={idx} category={category} />
        ))}
      </div>
    </div>
  );
};
