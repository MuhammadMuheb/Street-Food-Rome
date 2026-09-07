import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  imageUrl: string | null;
}

const CHIPS = ['Trastevere', 'Testaccio', 'Suppli', 'Pizza al Taglio', 'Food Tours'];

export function Hero({ imageUrl }: HeroProps) {
  return (
    <section className="bg-ink">
      <div className="relative h-[460px] w-full sm:h-[480px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="A small, authentic Roman trattoria with a handwritten specials board — Rome street food, not a generic Europe scene"
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
              'linear-gradient(to top, rgba(24,20,15,0.6) 0%, rgba(24,20,15,0.35) 45%, rgba(24,20,15,0.45) 100%)',
          }}
        />

        <div
          className="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center"
          style={{ textShadow: '0 2px 24px rgba(24,20,15,0.65)' }}
        >
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-paper sm:text-5xl md:text-6xl">
            Rome&rsquo;s Ultimate Street Food &amp; Culinary Experiences
          </h1>

          <form action="#" className="mt-8 w-full max-w-2xl">
            <div className="flex items-center gap-3 rounded-full bg-paper p-2 pl-6 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink-muted" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                name="q"
                placeholder="Trastevere, Testaccio, Suppli, Pizza al Taglio…"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-hover"
              >
                Search Tours
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Category chips — separate light strip below the photo, not overlaid on it */}
      <div className="border-b border-line bg-paper-tint">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-6 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CHIPS.map((chip) => (
            <Link
              key={chip}
              href="#"
              className="shrink-0 rounded-full border border-line-strong bg-paper px-5 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-paper"
            >
              {chip}
            </Link>
          ))}
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
