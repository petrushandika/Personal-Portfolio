import { Briefcase, Calendar } from 'lucide-react';
import React from 'react';

export const Experience = () => {
  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'PT Astronacci International',
      duration: 'Sep 2025 - Present',
      description:
        'Developing high-performance backends and interactive interfaces for trading tools, financial analysis systems, and astrological analytic dashboards configs setups layout sets pricing triggering setups framing.',
      technologies: ['React', 'Node.js', 'Typescript', 'Next.js', 'PostgreSQL'],
    },
    {
      role: 'Full Stack Developer',
      company: '14DAYPILOT Flight Academy',
      duration: 'Sep 2025 - Present',
      description:
        'Building and maintaining robust full-stack applications for flight academy operations, optimizing backends and flight logging triggers dashboards setups.',
      technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    },
    {
      role: 'Web Developer',
      company: 'PT Estetindo Global Indonesia',
      duration: 'Sep 2024 - Nov 2025',
      description:
        'Revamped the company website to improve user experience, managed Meta Ads campaigns, and implemented SEO strategies to increase organic traffic spikes setup configurations.',
      technologies: ['PHP', 'Laravel', 'JavaScript', 'WordPress', 'SEO'],
    },
    {
      role: 'Machine Learning Engineer Cohort',
      company: 'Coding Camp powered by DBS Foundation',
      duration: 'Feb 2025 - Jun 2025',
      description:
        'Intensive training in Machine Learning workflows, focusing on NLP, LLMs, and high-level training pipelines deployment sets up framing.',
      technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'LangChain'],
    },
    {
      role: 'Assistant Lecturer',
      company: 'Nurul Fikri (STT NF)',
      duration: 'Jan 2023 - Jun 2023',
      description:
        'Coordinated virtual classes, evaluated student assignments, and delivered presentations on Artificial Intelligence topics for undergraduate sets up.',
      technologies: ['Python', 'AI Fundamentals'],
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="text-left items-start md:items-end mb-16 flex flex-col md:flex-row gap-6 border-b border-white/10 pb-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight flex items-center gap-4">
          <span className="text-brand-400 font-mono text-xl md:text-2xl font-normal">02.</span>
          Professional Experience
        </h2>
        <div className="hidden md:block w-px h-8 bg-white/10 ml-4" />
        <span className="text-brand-400 font-mono text-sm tracking-wide">Where I've worked</span>
      </div>

      <div className="space-y-0 relative border-l-2 border-brand-500/20 pl-8 md:pl-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="group relative pb-12 last:pb-0">
            {/* Timeline Dot */}
            <div className="absolute left-0 -translate-x-[calc(50%+1.5rem)] md:-translate-x-[calc(50%+3rem)] top-1.5 w-4 h-4 rounded-full bg-bg-base border-4 border-brand-500 shadow-[0_0_12px_rgba(99,102,241,0.5)] z-10 group-hover:scale-110 transition-transform duration-300" />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-400 tracking-wide mb-2">
                <Calendar className="w-3.5 h-3.5" />
                {exp.duration}
              </span>

              <h3 className="text-xl md:text-2xl font-bold font-sans text-gray-200 group-hover:text-brand-300 transition-colors duration-300">
                {exp.role}
              </h3>

              <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mt-1 mb-3">
                <Briefcase className="w-4 h-4 text-brand-400/80" />
                {exp.company}
              </div>

              <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-white/[0.03] text-gray-300 px-3 py-1 rounded-full border border-white/10 group-hover:border-brand-500/20 group-hover:bg-brand-500/5 group-hover:text-brand-300 transition-all tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
