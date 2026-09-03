/**
 * packages/templates/src/t3-food/blocks/WhatYouEatList.tsx — "what you
 * actually eat" dish list, the T3 Food money-page staple.
 */
import { Section } from '@italy-tours/ui';

export interface WhatYouEatListProps {
  dishes: string[];
}

export function WhatYouEatList({ dishes }: WhatYouEatListProps) {
  if (dishes.length === 0) return null;

  return (
    <Section heading="What you actually eat">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {dishes.map((dish) => (
          <li key={dish} className="rounded-site border border-foreground/10 p-3 text-sm text-foreground/80">
            {dish}
          </li>
        ))}
      </ul>
    </Section>
  );
}
