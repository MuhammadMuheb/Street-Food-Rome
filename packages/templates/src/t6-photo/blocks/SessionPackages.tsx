/**
 * packages/templates/src/t6-photo/blocks/SessionPackages.tsx — session-package
 * spotlight cards (e.g. sunrise solo, couple, small-group).
 */
import { Section, Badge } from '@italy-tours/ui';

export interface SessionPackage {
  name: string;
  description: string;
  tag: string;
}

export interface SessionPackagesProps {
  packages: SessionPackage[];
}

export function SessionPackages({ packages }: SessionPackagesProps) {
  if (packages.length === 0) return null;

  return (
    <Section heading="Session packages worth knowing about">
      <div className="grid gap-4 sm:grid-cols-2">
        {packages.map((pkg) => (
          <div key={pkg.name} className="rounded-site border border-foreground/10 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-foreground">{pkg.name}</h3>
              <Badge>{pkg.tag}</Badge>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{pkg.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
