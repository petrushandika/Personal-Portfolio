import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import React from 'react';

interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
}

export function Hero({
  name = 'Petrus Handika.',
  title = 'I build robust web applications.',
  description = "I'm a Full-Stack Developer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products using modern technologies.",
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Animated glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px] animate-blob" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[100px] animate-blob"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] animate-blob"
        style={{ animationDelay: '4s' }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full mb-8 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
              <span className="text-sm font-mono text-brand-300">
                Available for new opportunities
              </span>
            </div>

            <h1 className="text-lg md:text-xl font-mono text-brand-400 mb-4 tracking-wide">
              Hi, my name is
            </h1>

            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-bold text-gray-100 mb-4 tracking-tight leading-[1.1]">
              {name}
            </h2>

            <h3 className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-gray-400 mb-6 tracking-tight leading-[1.1]">
              {title}
            </h3>

            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed font-light">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start w-full sm:w-auto">
              <a href="#projects" className="btn-primary">
                Checkout my work!
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-secondary">
                Resume
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 md:gap-12 mt-12 pt-8 border-t border-white/10 w-full max-w-lg">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">5+</div>
                <div className="text-xs md:text-sm font-medium text-brand-400 uppercase tracking-wider">
                  Years Exp
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">20+</div>
                <div className="text-xs md:text-sm font-medium text-brand-400 uppercase tracking-wider">
                  Projects
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">10+</div>
                <div className="text-xs md:text-sm font-medium text-brand-400 uppercase tracking-wider">
                  Clients
                </div>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative mb-10 lg:mb-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-[24rem] lg:h-[24rem]">
              {/* Decorative Frame Elements - Abusaid style */}
              <div className="absolute inset-0 bg-transparent border-2 border-brand-400 rounded-xl translate-x-5 translate-y-5 transition-transform duration-500 hover:translate-x-3 hover:translate-y-3 z-0" />

              {/* Actual Image Container (Empty for now) */}
              <div className="w-full h-full relative z-10 flex flex-col justify-center items-center overflow-hidden group bg-[#112240] rounded-xl border border-brand-500/20">
                {/* 
                  NOTE FOR USER: 
                  Place your image here. Example:
                  <img src="/your-photo.jpg" alt="Petrus Handika" className="absolute inset-0 w-full h-full object-cover rounded-[14px]" />
                */}
                <div className="w-20 h-20 mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-10 h-10 text-brand-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-brand-300 font-mono text-sm tracking-wide text-center px-4">
                  [ Profile Image ]
                </p>
                <div className="absolute inset-0 bg-brand-500/20 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
