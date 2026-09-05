/**
 * packages/templates/src/t4-cooking/blocks/ClassFormatCards.tsx — class-format
 * spotlight cards (e.g. private, small-group, market-to-table).
 */
import { Section, Badge } from '@italy-tours/ui';

export interface ClassFormatCard {
  name: string;
  description: string;
  tag: string;
}

export interface ClassFormatCardsProps {
  formats: ClassFormatCard[];
}

export function ClassFormatCards({ formats }: ClassFormatCardsProps) {
  if (formats.length === 0) return null;

  return (
    <Section heading="Class formats worth knowing about">
      <div className="grid gap-4 sm:grid-cols-2">
        {formats.map((format) => (
          <div key={format.name} className="rounded-site border border-foreground/10 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-foreground">{format.name}</h3>
              <Badge>{format.tag}</Badge>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{format.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
