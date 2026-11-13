'use client';

import { Children, useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Outside arrows and frame-sized slides match the original marketplace carousel. */
export function MarketplaceCarousel({ children, label }: { children: ReactNode; label: string }) {
  const count = Children.count(children);
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (hovered || focused || count < 2) return;
    const timer = window.setInterval(() => setSlide(current => (current + 1) % count), 2500);
    return () => window.clearInterval(timer);
  }, [hovered, focused, count]);

  const arrowClass = 'absolute top-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform z-20 disabled:opacity-40 disabled:cursor-not-allowed enabled:bg-white enabled:hover:scale-110 enabled:hover:opacity-100 enabled:opacity-90';
  return (
    <div className="w-full mx-auto relative !bg-transparent m-0 p-0 h-full" role="region" aria-roledescription="carousel" aria-label={label} tabIndex={0}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); setSlide(current => Math.max(0, current - 1)); }
        if (event.key === 'ArrowRight') { event.preventDefault(); setSlide(current => Math.min(count - 1, current + 1)); }
      }}>
      <button type="button" aria-label="Previous slide" disabled={slide === 0} onClick={() => setSlide(current => Math.max(0, current - 1))} className={`${arrowClass} -left-8 lg:-left-12`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 lg:w-4 lg:h-4 text-black pr-0.5"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button type="button" aria-label="Next slide" disabled={slide === count - 1} onClick={() => setSlide(current => Math.min(count - 1, current + 1))} className={`${arrowClass} -right-8 lg:-right-12`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 lg:w-4 lg:h-4 text-black pl-0.5"><path d="m9 18 6-6-6-6" /></svg>
      </button>
      <div className="flex flex-col gap-3 h-full">
        <div className="relative overflow-hidden w-full h-full rounded-xl overflow-hidden">
          <motion.div data-slide-track className="flex w-full items-center h-full" animate={{ x: `-${slide * 100}%` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>{children}</motion.div>
          <div className="absolute bottom-2 lg:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 lg:gap-2 p-1.5 px-3 lg:p-2 lg:px-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
            {Array.from({ length: count }, (_, index) => <button key={index} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={index === slide ? 'true' : undefined} onClick={() => setSlide(index)} className={`h-1.5 lg:h-2 rounded-full transition-all ${index === slide ? 'w-6 lg:w-8 bg-white' : 'w-1.5 lg:w-2 bg-white/50'}`} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
