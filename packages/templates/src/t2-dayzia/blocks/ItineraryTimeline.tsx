/**
 * packages/templates/src/t2-dayzia/blocks/ItineraryTimeline.tsx — ordered stop
 * list for a day trip (e.g. "9am — depart Rome", "11am — Pompeii ruins").
 */
import { Section, Badge } from '@italy-tours/ui';

export interface ItineraryStop {
  time: string;
  title: string;
  description: string;
}

export interface ItineraryTimelineProps {
  stops: ItineraryStop[];
}

export function ItineraryTimeline({ stops }: ItineraryTimelineProps) {
  if (stops.length === 0) return null;

  return (
    <Section heading="How the day actually goes">
      <ol className="flex flex-col gap-4">
        {stops.map((stop) => (
          <li key={`${stop.time}-${stop.title}`} className="rounded-site border border-foreground/10 p-4">
            <div className="flex items-center gap-3">
              <Badge>{stop.time}</Badge>
              <h3 className="font-heading font-semibold text-foreground">{stop.title}</h3>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{stop.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
