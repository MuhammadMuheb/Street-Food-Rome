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
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">{tour.title}</h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-ink-muted">
          {tour.duration ? <span>{tour.duration}</span> : null}
          {tour.priceBand ? <span className="text-gold">{tour.priceBand}</span> : null}
          <span>{tour.city}</span>
        </div>

        {tour.firstHandNotes ? (
          <p className="line-clamp-3 text-sm text-ink-muted">{tour.firstHandNotes}</p>
        ) : null}

        <span className="mt-auto pt-2 text-sm font-semibold text-accent group-hover:text-accent-hover">
          Read the full guide →
        </span>
      </div>
    </Link>
  );
}
