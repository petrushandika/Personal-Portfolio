import React from 'react';

interface AboutProps {
  title?: string;
  content?: string;
}

export function About({
  title = 'About Me',
  content = `I'm a Full-Stack Developer with a passion for building beautiful, functional web applications. 
  I specialize in modern technologies like React, Next.js, Node.js, and cloud platforms.
  
  With experience in both frontend and backend development, I create end-to-end solutions that deliver 
  exceptional user experiences. I love tackling complex problems and turning ideas into reality through clean, 
  maintainable code.`,
}: AboutProps) {
  const paragraphs = content.split('\n\n').filter(Boolean);

  const skills = [
    { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
    { name: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis'] },
    { name: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma'] },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left - Content */}
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Location & Availability */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                  <svg
                    className="w-4 h-4 text-primary-600"
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
                  <span className="text-sm text-gray-600">Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                  <svg
                    className="w-4 h-4 text-green-600"
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
                  <span className="text-sm text-green-700">Available for freelance</span>
                </div>
              </div>
            </div>

            {/* Right - Skills */}
            <div className="space-y-8">
              {skills.map((category) => (
                <div key={category.name}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-gradient-to-r from-primary-50 to-purple-50 text-gray-700 text-sm font-medium rounded-full border border-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-300"
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
