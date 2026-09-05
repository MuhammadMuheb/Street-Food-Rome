/**
 * apps/web/src/sites/streetfoodrome/components/Hero.tsx — bespoke,
 * editorial-style hero: full-bleed image with overlaid title, distinct from
 * T3 Food's HeroAppetite (packages/templates) by design — this hero doesn't
 * share markup with the template packs at all (blueprint §5.2).
 *
 * `stats` is the magazine-feature "fact strip" (rating, duration, price) —
 * optional, since a Home or About hero has nothing to quantify but a money
 * page does.
 */
import Image from 'next/image';
import { Container } from '@italy-tours/ui';

export interface HeroStat {
  value: string;
  label: string;
}

export interface StreetFoodRomeHeroProps {
  title: string;
  subhead?: string;
  imageUrl?: string | null;
  imageAlt?: string;
  stats?: HeroStat[];
}

export function Hero({ title, subhead, imageUrl, imageAlt, stats }: StreetFoodRomeHeroProps) {
  return (
    // Always a dark, moody image banner — independent of the site's
    // light/dark mode, not derived from it — bg-foreground/text-background
    // would otherwise flip in dark mode and put near-black text under the
    // hardcoded black gradient overlay below.
    <div className="relative flex min-h-[62vh] items-end overflow-hidden bg-neutral-900 text-inverse sm:min-h-[78vh]">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt ?? ''}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%] opacity-90"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <Container className="relative pb-14 pt-32 sm:pb-20">
        <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3b6a8]">
          <span className="block h-px w-5 bg-[#f3b6a8]" aria-hidden />
          Street Food Rome
        </p>
        <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
          {title}
        </h1>
        {subhead ? <p className="mt-5 max-w-xl text-base text-inverse/80 sm:text-lg">{subhead}</p> : null}
        {stats && stats.length > 0 ? (
          <div className="mt-9 flex flex-wrap gap-0 border-t border-inverse/20 pt-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`pr-6 ${i < stats.length - 1 ? 'mr-6 border-r border-inverse/20' : ''}`}
              >
                <b className="block font-heading text-lg font-semibold sm:text-xl">{stat.value}</b>
                <span className="mt-0.5 block text-[11px] uppercase tracking-[0.1em] text-inverse/55">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
