/**
 * packages/templates/src/t1-monument/blocks/VisitorFacts.tsx — "what you
 * actually need to know" practical visitor facts list.
 */
import { Section } from '@italy-tours/ui';

export interface VisitorFactsProps {
  facts: string[];
}

export function VisitorFacts({ facts }: VisitorFactsProps) {
  if (facts.length === 0) return null;

  return (
    <Section heading="Before you go">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {facts.map((fact) => (
          <li key={fact} className="rounded-site border border-foreground/10 p-3 text-sm text-foreground/80">
            {fact}
          </li>
        ))}
      </ul>
    </Section>
  );
}
