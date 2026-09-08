'use client';

import { useRef } from 'react';
import type { TourDoc } from '@/lib/firestore';
import { TourCard } from './TourCard';

export function TourCarouselSection({ tours }: { tours: TourDoc[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByOneCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    // Card width + the track's own gap — moves exactly one card per click,
    // regardless of viewport width or how many cards are visible at once.
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    const delta = (firstCard.getBoundingClientRect().width + gap) * direction;
    track.scrollBy({ left: delta, behavior: 'smooth' });
  }

  return (
    <section className="bg-[#f9fafa] py-16">
      <div className="mx-auto max-w-[1440px] px-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9aa0a5]">
              Our best selling tours at a glance
            </p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-[#1a1a1a]">
              Most Popular Tours
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous tour"
              onClick={() => scrollByOneCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8ebed] bg-white text-[#1a1a1a] transition-colors hover:bg-[#f4f4f4]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next tour"
              onClick={() => scrollByOneCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8ebed] bg-white text-[#1a1a1a] transition-colors hover:bg-[#f4f4f4]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* 4 cards visible per row; each card is 1/4 of the track width minus
            gaps, so scrolling by one card's measured width moves exactly one
            card at a time rather than jumping a full screen. */}
        <div
          ref={trackRef}
          className="mt-10 grid auto-cols-[calc((100%-3*1.75rem)/4)] grid-flow-col gap-7 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {tours.map((tour, index) => (
            <div key={tour.slug} style={{ scrollSnapAlign: 'start' }}>
              <TourCard tour={tour} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
