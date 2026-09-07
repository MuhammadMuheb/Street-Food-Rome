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
      <div className="relative h-[520px] w-full sm:h-[560px]">
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
              'linear-gradient(to top, rgba(24,20,15,0.95) 0%, rgba(24,20,15,0.75) 45%, rgba(24,20,15,0.35) 100%)',
          }}
        />

        <div
          className="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center"
          style={{ textShadow: '0 2px 20px rgba(24,20,15,0.55)' }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Written by a 12-year Rome resident
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-paper sm:text-5xl md:text-6xl">
            Rome&rsquo;s Street Food, Mapped by Someone Who Actually Eats It
          </h1>
          <p className="mt-5 max-w-lg text-lg text-paper/90">
            No tourist-trap listicles — every tour and market stall here has been personally
            eaten at in the last year.
          </p>

          <form action="/rome-street-food-tour" className="mt-8 w-full max-w-md">
            <div className="flex items-center gap-2 rounded-full bg-paper p-1.5 pl-5 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink-muted" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                name="q"
                placeholder="Trastevere, Testaccio, Aperitivo…"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-hover"
              >
                Search Tours
              </button>
            </div>
          </form>

          <div className="mt-6 flex w-full items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full border border-paper/35 px-4 py-1.5 text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper/35 text-paper">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
