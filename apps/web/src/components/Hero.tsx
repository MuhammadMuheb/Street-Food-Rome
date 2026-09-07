import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  imageUrl: string | null;
}

const CHIPS = ['Trastevere', 'Testaccio', 'Suppli', 'Pizza al Taglio', 'Food Tours'];

export function Hero({ imageUrl }: HeroProps) {
  return (
    <section>
      <div className="relative h-[340px] w-full sm:h-[420px]">
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
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative mx-auto flex h-full max-w-[896px] flex-col justify-center px-6">
          <h1 className="font-sans text-[40px] font-extrabold leading-[1.15] text-white sm:text-[56px] sm:leading-[72px]">
            Rome&rsquo;s Ultimate Street Food &amp; Culinary Experiences
          </h1>

          <form action="#" className="mt-8 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_8px_48px_rgba(45,51,57,0.16)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-3 shrink-0 text-[#6b7280]" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              name="q"
              placeholder="Trastevere, Testaccio, Suppli, Pizza al Taglio…."
              className="h-10 w-full bg-transparent text-base text-[#1a1a1a] placeholder:text-[#6b7280] focus:outline-none"
            />
            <button
              type="submit"
              className="h-10 shrink-0 rounded-[6px] border border-[#f40051] px-2 text-base font-medium text-[#f40051]"
            >
              Search Tours
            </button>
          </form>
        </div>
      </div>

      {/* Category chips — separate light strip below the photo, matching the reference exactly */}
      <div className="bg-[#f9fafa]">
        <div className="mx-auto flex max-w-[896px] items-center gap-3 overflow-x-auto px-6 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CHIPS.map((chip) => (
            <Link
              key={chip}
              href="#"
              className="flex h-[42px] shrink-0 items-center rounded-lg border border-[#e8ebed] bg-white px-3 text-base font-bold text-[#f40051]"
            >
              {chip}
            </Link>
          ))}
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#2b2e2f]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
