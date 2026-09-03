/**
 * packages/ui/src/blocks/TourCard.tsx — a single bookable tour, rendered from
 * normalized data (not the raw Payload `Tours` doc shape) so this component
 * has no CMS dependency.
 *
 * `href` should always be a cloaked `/go/:slug` link (packages/affiliate) —
 * never the partner's raw affiliate URL.
 */
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
    <div className="flex flex-col overflow-hidden rounded-site border border-foreground/10">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={imageAlt ?? ''} className="h-40 w-full object-cover" />
      ) : null}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
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
