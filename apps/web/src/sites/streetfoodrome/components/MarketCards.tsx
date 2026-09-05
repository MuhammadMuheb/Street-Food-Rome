/**
 * apps/web/src/sites/streetfoodrome/components/MarketCards.tsx — bespoke
 * market spotlight grid, for /rome-market-guide.
 */
import Image from 'next/image';
import { Section } from '@italy-tours/ui';
import { itemImage } from '../placeholderImages';

export interface StreetFoodRomeMarketCard {
  name: string;
  description: string;
}

export function MarketCards({ markets }: { markets: StreetFoodRomeMarketCard[] }) {
  if (markets.length === 0) return null;

  return (
    <Section kicker="Where to go" heading="Markets worth the walk" tint>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {markets.map((market) => {
          const image = itemImage(market.name);
          return (
            <div
              key={market.name}
              className="group overflow-hidden rounded-site border border-foreground/10 bg-background shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground">{market.name}</h3>
                <p className="mt-1.5 text-sm text-foreground/70">{market.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
