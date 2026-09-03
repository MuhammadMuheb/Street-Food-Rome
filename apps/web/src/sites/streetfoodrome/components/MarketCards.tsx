/**
 * apps/web/src/sites/streetfoodrome/components/MarketCards.tsx — bespoke
 * market spotlight, for /rome-market-guide.
 */
import { Section } from '@italy-tours/ui';

export interface StreetFoodRomeMarketCard {
  name: string;
  description: string;
}

export function MarketCards({ markets }: { markets: StreetFoodRomeMarketCard[] }) {
  if (markets.length === 0) return null;

  return (
    <Section heading="Markets worth the walk">
      <div className="flex flex-col divide-y divide-foreground/10">
        {markets.map((market) => (
          <div key={market.name} className="py-4">
            <h3 className="font-heading font-semibold text-foreground">{market.name}</h3>
            <p className="mt-1 text-sm text-foreground/70">{market.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
