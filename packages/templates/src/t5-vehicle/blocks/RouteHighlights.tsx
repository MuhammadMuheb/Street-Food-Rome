/**
 * packages/templates/src/t5-vehicle/blocks/RouteHighlights.tsx — ordered stop
 * list along a ride route (e.g. "Coastal lookout", "Old town square").
 */
import { Section, Badge } from '@italy-tours/ui';

export interface RouteStop {
  distance: string;
  title: string;
  description: string;
}

export interface RouteHighlightsProps {
  stops: RouteStop[];
}

export function RouteHighlights({ stops }: RouteHighlightsProps) {
  if (stops.length === 0) return null;

  return (
    <Section heading="What's along the route">
      <ol className="flex flex-col gap-4">
        {stops.map((stop) => (
          <li key={`${stop.distance}-${stop.title}`} className="rounded-site border border-foreground/10 p-4">
            <div className="flex items-center gap-3">
              <Badge>{stop.distance}</Badge>
              <h3 className="font-heading font-semibold text-foreground">{stop.title}</h3>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{stop.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
