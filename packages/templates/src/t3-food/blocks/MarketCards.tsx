/**
 * packages/templates/src/t3-food/blocks/MarketCards.tsx — food market
 * spotlight cards (e.g. Testaccio, Campo de' Fiori).
 */
import { Section, Badge } from '@italy-tours/ui';

export interface MarketCard {
  name: string;
  description: string;
  neighbourhood: string;
}

export interface MarketCardsProps {
  markets: MarketCard[];
}

export function MarketCards({ markets }: MarketCardsProps) {
  if (markets.length === 0) return null;

  return (
    <Section heading="Markets worth the detour">
      <div className="grid gap-4 sm:grid-cols-2">
        {markets.map((market) => (
          <div key={market.name} className="rounded-site border border-foreground/10 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-foreground">{market.name}</h3>
              <Badge>{market.neighbourhood}</Badge>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{market.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
