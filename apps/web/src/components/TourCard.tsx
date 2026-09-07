import Image from 'next/image';
import Link from 'next/link';
import type { TourDoc } from '@/lib/firestore';

interface TourCardProps {
  tour: TourDoc;
  /** The written guide page this tour's card links to (e.g. "/trastevere-food-tour"). */
  guideHref: string;
  priority?: boolean;
}

export function TourCard({ tour, guideHref, priority }: TourCardProps) {
  return (
    <Link
      href={guideHref}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(24,20,15,0.25)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-tint">
        {tour.imageUrl ? (
          <Image
            src={tour.imageUrl}
            alt={`${tour.title} — a Street Food Rome tour in ${tour.city}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink-muted">
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
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">{tour.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-xs font-medium text-ink-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          {tour.duration ? <span>{tour.duration}</span> : null}
          <span className="text-line-strong">•</span>
          <span>{tour.city}</span>
        </div>

        {tour.firstHandNotes ? (
          <p className="mt-3 line-clamp-2 text-sm text-ink-muted">{tour.firstHandNotes}</p>
        ) : null}

        <div className="mt-auto flex items-end justify-between pt-4">
          <span className="text-sm font-semibold text-accent group-hover:text-accent-hover">
            Read the full guide →
          </span>
          {tour.priceBand ? (
            <span className="text-right">
              <span className="block text-[11px] uppercase tracking-wide text-ink-muted">from</span>
              <span className="font-display text-lg font-semibold text-ink">{tour.priceBand}</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
