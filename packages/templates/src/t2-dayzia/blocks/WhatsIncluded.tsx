/**
 * packages/templates/src/t2-dayzia/blocks/WhatsIncluded.tsx — "what's
 * actually included" list, the T2 Day Trip money-page staple.
 */
import { Section } from '@italy-tours/ui';

export interface WhatsIncludedProps {
  items: string[];
}

export function WhatsIncluded({ items }: WhatsIncludedProps) {
  if (items.length === 0) return null;

  return (
    <Section heading="What's actually included">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item} className="rounded-site border border-foreground/10 p-3 text-sm text-foreground/80">
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
