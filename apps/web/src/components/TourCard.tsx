import Image from 'next/image';
import Link from 'next/link';
import type { TourDoc } from '@/lib/firestore';

interface TourCardProps {
  tour: TourDoc;
  priority?: boolean;
}

export function TourCard({ tour, priority }: TourCardProps) {
  return (
    <Link
      href="#"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#eef0f1] bg-white transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(45,51,57,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
        {tour.imageUrl ? (
          <Image
            src={tour.imageUrl}
            alt={`${tour.title} — a Street Food Rome tour in ${tour.city}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#9aa0a5] shadow-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 20s-7-4.35-9.5-8.8C.6 8 2 4.5 5.5 4c2-.28 3.7.7 4.5 2.3.8-1.6 2.5-2.58 4.5-2.3C18 4.5 19.4 8 17.5 11.2 15 15.65 12 20 12 20Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-sans text-base font-bold leading-snug text-[#1a1a1a]">{tour.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-[#5c6166]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          {tour.duration ? <span>{tour.duration}</span> : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-[#eafaf0] px-2 py-1 text-xs font-semibold text-[#1a8a4a]">
            Free Cancellation
          </span>
          <span className="rounded-md bg-[#eef4fb] px-2 py-1 text-xs font-semibold text-[#2563a8]">
            Small Group
          </span>
        </div>

        {tour.firstHandNotes ? (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#5c6166]">{tour.firstHandNotes}</p>
        ) : null}

        <div className="mt-auto flex items-end justify-end pt-4">
          {tour.priceBand ? (
            <span className="text-right">
              <span className="font-sans text-2xl font-bold text-[#1a1a1a]">{tour.priceBand}</span>
              <span className="ml-1 text-sm text-[#9aa0a5]">/adult</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
