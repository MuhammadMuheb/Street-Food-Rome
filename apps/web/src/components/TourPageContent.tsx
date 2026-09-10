import Link from 'next/link';
import type { TourDoc } from '@/lib/firestore';
import { SafeImage } from './SafeImage';

/** The only 3 tour pages this site exposes — exact URL paired with the real Firestore tour slug it renders. */
export const KEPT_TOURS = [
  { path: 'trastevere-food-tour', realSlug: 'trastevere-food-wine-walk' },
  { path: 'jewish-ghetto-tour', realSlug: 'jewish-ghetto-food-tour' },
  { path: 'street-food-market-tour', realSlug: 'testaccio-market-food-tour' },
] as const;

interface TourPageContentProps {
  tour: TourDoc;
  otherTours: { title: string; href: string }[];
}

export function TourPageContent({ tour, otherTours }: TourPageContentProps) {
  return (
    <>
      <section className="bg-[#f9fafa] py-10 sm:py-14">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-14">
          <nav className="text-sm text-[#9aa0a5]">
            <Link href="/" className="hover:text-[#ff0022]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#5c6166]">{tour.title}</span>
          </nav>

          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] sm:text-4xl">
            {tour.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#5c6166]">
            {tour.duration ? (
              <span className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {tour.duration}
              </span>
            ) : null}
            <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-[#5c6166]">Free Cancellation</span>
            <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-[#5c6166]">Small Group</span>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-6 sm:px-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#f4f4f4]">
              {tour.imageUrl ? (
                <SafeImage
                  src={tour.imageUrl}
                  alt={`${tour.title} — a Street Food Rome tour in ${tour.city}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 660px, 90vw"
                  className="object-cover"
                />
              ) : null}
            </div>

            {tour.firstHandNotes ? (
              <div className="mt-8">
                <h2 className="font-display text-xl font-semibold text-[#1a1a1a]">What to expect</h2>
                <p className="mt-3 text-base leading-relaxed text-[#5c6166]">{tour.firstHandNotes}</p>
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-2xl border border-[#e8ebed] bg-white p-6 shadow-[0_8px_32px_rgba(45,51,57,0.08)] lg:sticky lg:top-24">
            {tour.priceBand ? (
              <p>
                <span className="font-display text-3xl font-semibold text-[#1a1a1a]">{tour.priceBand}</span>
                <span className="ml-1 text-sm text-[#9aa0a5]">/adult</span>
              </p>
            ) : null}

            <Link
              href={tour.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-4 flex h-12 w-full items-center justify-center rounded-[6px] bg-[#ff0022] text-sm font-bold text-white transition-colors hover:bg-[#e0001d]"
            >
              Check Availability
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-[#9aa0a5]">
              Booking is handled by GetYourGuide, our booking partner — you&rsquo;ll be taken to their site to
              confirm your date and pay. Free cancellation up to 24 hours before the tour.
            </p>
          </aside>
        </div>
      </section>

      {otherTours.length > 0 ? (
        <section className="bg-[#f9fafa] py-14">
          <div className="mx-auto max-w-[1100px] px-6 sm:px-14">
            <h2 className="font-display text-2xl font-semibold text-[#1a1a1a]">You might also like</h2>
            <ul className="mt-6 space-y-3">
              {otherTours.map((other) => (
                <li key={other.href}>
                  <Link href={other.href} className="text-sm font-bold text-[#ff0022] hover:underline">
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
