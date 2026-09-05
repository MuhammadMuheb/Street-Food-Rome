/**
 * packages/templates/src/t1-monument/blocks/TicketOptions.tsx — ticket-type
 * spotlight cards (e.g. skip-the-line, guided, combo access).
 */
import { Section, Badge } from '@italy-tours/ui';

export interface TicketOption {
  name: string;
  description: string;
  tag: string;
}

export interface TicketOptionsProps {
  options: TicketOption[];
}

export function TicketOptions({ options }: TicketOptionsProps) {
  if (options.length === 0) return null;

  return (
    <Section heading="Ticket options worth knowing about">
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => (
          <div key={option.name} className="rounded-site border border-foreground/10 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-foreground">{option.name}</h3>
              <Badge>{option.tag}</Badge>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{option.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
