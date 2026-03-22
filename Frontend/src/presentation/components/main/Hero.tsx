import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import React from 'react';
import StackIcon from 'tech-stack-icons';

interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
}

export function Hero({
  name = 'Petrus Handika.',
  description = "I'm a Full-Stack Developer specializing in building exceptional digital experiences. Focused on building accessible, human-centered products using modern technologies.",
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16">
      {/* Animated glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-blob" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-[100px] animate-blob"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-white/3 rounded-full blur-[140px] animate-blob"
        style={{ animationDelay: '4s' }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-start text-left">
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

            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed font-light">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-start w-full sm:w-auto">
              <a href="#projects" className="btn-primary">
                Checkout my work!
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-secondary">
                Resume
              </a>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative mb-10 lg:mb-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-[24rem] lg:h-[24rem]">
              <div className="absolute inset-0 bg-transparent border-2 border-brand-400 rounded-xl translate-x-5 translate-y-5 transition-transform duration-500 hover:translate-x-3 hover:translate-y-3 z-0" />
              <div className="w-full h-full relative z-10 flex flex-col justify-center items-center overflow-hidden group bg-[#112240] rounded-xl border border-brand-500/20">
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
