/**
 * packages/templates/src/t6-photo/blocks/ShotListHighlights.tsx — "what you
 * actually shoot" iconic-spot list, the T6 Photo money-page staple.
 */
import { Section } from '@italy-tours/ui';

export interface ShotListHighlightsProps {
  spots: string[];
}

export function ShotListHighlights({ spots }: ShotListHighlightsProps) {
  if (spots.length === 0) return null;

  return (
    <Section heading="What you actually shoot">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {spots.map((spot) => (
          <li key={spot} className="rounded-site border border-foreground/10 p-3 text-sm text-foreground/80">
            {spot}
          </li>
        ))}
      </ul>
    </Section>
  );
}
