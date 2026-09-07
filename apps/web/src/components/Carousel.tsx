'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';

export function Carousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(delta: number) {
    trackRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy(-360)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-paper-tint"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy(360)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-paper-tint"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div ref={trackRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
