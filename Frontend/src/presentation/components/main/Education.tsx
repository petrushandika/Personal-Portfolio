import { Award, BookOpen } from 'lucide-react';
import React from 'react';

export const Education = () => {
  const educations = [
    {
      school: 'Gunadarma University',
      degree: 'Computer Science and Information Technology',
      duration: '2022 - 2026',
      description:
        'Interest to study: Web Development, Database Systems and Machine Learning. Gained strong fundamentals in computer science setups layouts setups.',
      skills: [
        'Python',
        'C',
        'Java',
        'PHP',
        'Oracle Database',
        'MySQL',
        'Jupyter Notebook',
        'Anaconda',
        'Power BI',
        'Tableau',
      ],
    },
    {
      school: 'PT. DumbWays Indonesia Teknologi',
      degree: 'Full Stack Developer Academy',
      duration: 'Apr 2024 - Sep 2024',
      description:
        'Fundamental FullStack training and Bootcamp. Built multiple end-to-end projects sets up framing configs setups triggers setups configurations.',
      skills: [
        'HTML5',
        'GitHub',
        'TypeScript',
        'JavaScript',
        'PostgreSQL',
        'Prisma ORM',
        'NestJS',
        'Redux.js',
        'Node.js',
        'React Native',
        'Vue.js',
        'Git',
        'React.js',
        'Bootstrap',
        'Redis',
        'CSS',
        'Tailwind CSS',
        'Express.js',
        'Socket.io',
        'Handlebars.js',
      ],
    },
    {
      school: 'Regina Caeli School',
      degree: 'Natural Sciences',
      duration: '2017 - 2020',
      description:
        'Served in Student Council, Basketball Team, and Martial Art. Participated in Sport Section and Christmas Committee structures setups layout setups shapes triggers setups configurations.',
      skills: ['Student Council', 'Basketball', 'Martial Art'],
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="space-y-0 relative border-l-2 border-brand-500/20 pl-6 sm:pl-8 md:pl-12">
        {educations.map((edu, idx) => (
          <div key={idx} className="group relative pb-10 md:pb-12 last:pb-0">
            {/* Timeline Dot */}
            <div className="absolute left-0 -translate-x-[calc(50%+1.25rem)] sm:-translate-x-[calc(50%+1.5rem)] md:-translate-x-[calc(50%+3rem)] top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-bg-base border-2 sm:border-4 border-brand-500 shadow-[0_0_12px_rgba(99,102,241,0.5)] z-10 group-hover:scale-110 transition-transform duration-300" />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-400 tracking-wide mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                {edu.duration}
              </span>

              <h3 className="text-lg md:text-2xl font-bold font-sans text-gray-200 group-hover:text-brand-300 transition-colors duration-300">
                {edu.school}
              </h3>

              <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mt-1 mb-3">
                <Award className="w-4 h-4 text-brand-400/80" />
                {edu.degree}
              </div>

              <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                {edu.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-white/[0.03] text-gray-300 px-3 py-1 rounded-full border border-white/10 group-hover:border-brand-500/20 group-hover:bg-brand-500/5 group-hover:text-brand-300 transition-all tracking-wide"
                  >
                    {skill}
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
