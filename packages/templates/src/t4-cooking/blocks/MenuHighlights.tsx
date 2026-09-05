/**
 * packages/templates/src/t4-cooking/blocks/MenuHighlights.tsx — "what you
 * actually cook" dish list, the T4 Cooking money-page staple.
 */
import { Section } from '@italy-tours/ui';

export interface MenuHighlightsProps {
  dishes: string[];
}

export function MenuHighlights({ dishes }: MenuHighlightsProps) {
  if (dishes.length === 0) return null;

  return (
    <Section heading="What you actually cook">
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
