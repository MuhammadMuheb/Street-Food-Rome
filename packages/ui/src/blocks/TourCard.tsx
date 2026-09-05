/**
 * packages/ui/src/blocks/TourCard.tsx — a single bookable tour, rendered from
 * normalized data (not the raw Payload `Tours` doc shape) so this component
 * has no CMS dependency.
 *
 * `href` should always be a cloaked `/go/:slug` link (packages/affiliate) —
 * never the partner's raw affiliate URL.
 */
import Image from 'next/image';
import { Badge } from '../primitives/Badge';
import { ButtonLink } from '../primitives/Button';

export interface TourCardData {
  title: string;
  href: string;
  priceBand?: string;
  duration?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function TourCard({ title, href, priceBand, duration, imageUrl, imageAlt }: TourCardData) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-site border border-foreground/10 bg-background shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {imageUrl ? (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt ?? ''}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">{title}</h3>
        <div className="flex gap-2">
          {priceBand ? <Badge>{priceBand}</Badge> : null}
          {duration ? <Badge>{duration}</Badge> : null}
        </div>
        <ButtonLink href={href} variant="primary" className="mt-auto">
          Check availability
        </ButtonLink>
      </div>
    </div>
  );
}
