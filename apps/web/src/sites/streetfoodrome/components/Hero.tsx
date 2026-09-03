/**
 * apps/web/src/sites/streetfoodrome/components/Hero.tsx — bespoke,
 * editorial-style hero: full-bleed image with overlaid title, distinct from
 * T3 Food's HeroAppetite (packages/templates) by design — this hero doesn't
 * share markup with the template packs at all (blueprint §5.2).
 */
import { Container } from '@italy-tours/ui';

export interface StreetFoodRomeHeroProps {
  title: string;
  imageUrl?: string | null;
}

export function Hero({ title, imageUrl }: StreetFoodRomeHeroProps) {
  return (
    <div className="relative flex min-h-[60vh] items-end overflow-hidden bg-foreground text-background">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <Container className="relative pb-16 pt-32">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Street Food Rome</p>
        <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
      </Container>
    </div>
  );
}
