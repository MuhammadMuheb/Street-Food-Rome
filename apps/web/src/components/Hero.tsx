import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  imageUrl: string | null;
}

const QUICK_LINKS = [
  { label: 'Trastevere', href: '/trastevere-food-tour' },
  { label: 'Testaccio Market', href: '/testaccio-market-tour' },
  { label: 'Aperitivo', href: '/aperitivo-evening-tour' },
  { label: 'Food & Wine', href: '/rome-food-wine-tour' },
  { label: 'Neighbourhoods', href: '/best-neighbourhoods-for-food' },
  { label: 'Markets', href: '/rome-market-guide' },
];

export function Hero({ imageUrl }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="relative h-[600px] w-full sm:h-[660px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="A small, authentic Roman trattoria with a handwritten specials board, the kind of place this site is built around"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(24,20,15,0.95) 0%, rgba(24,20,15,0.8) 40%, rgba(24,20,15,0.6) 70%, rgba(24,20,15,0.5) 100%)',
          }}
        />

        <div
          className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16"
          style={{ textShadow: '0 2px 20px rgba(24,20,15,0.55)' }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Written by a 12-year Rome resident
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-paper sm:text-5xl md:text-6xl">
            Rome&rsquo;s Street Food, Mapped by Someone Who Actually Eats It
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/90">
            No tourist-trap listicles. Every tour, market stall, and trattoria here has been
            personally eaten at in the last year — most of them dozens of times.
          </p>

          <form action="/rome-street-food-tour" className="mt-8 flex max-w-xl">
            <div className="flex w-full items-center gap-3 rounded-full bg-paper px-5 py-4 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink-muted" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                name="q"
                placeholder="Trastevere, Testaccio Market, Aperitivo…"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-hover"
              >
                Find a tour
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-paper/35 px-4 py-1.5 text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
