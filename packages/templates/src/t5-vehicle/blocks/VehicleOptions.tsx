/**
 * packages/templates/src/t5-vehicle/blocks/VehicleOptions.tsx — vehicle-type
 * spotlight cards (e.g. scooter, classic car, boat).
 */
import { Section, Badge } from '@italy-tours/ui';

export interface VehicleOption {
  name: string;
  description: string;
  tag: string;
}

export interface VehicleOptionsProps {
  options: VehicleOption[];
}

export function VehicleOptions({ options }: VehicleOptionsProps) {
  if (options.length === 0) return null;

  return (
    <Section heading="Ride options worth knowing about">
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
