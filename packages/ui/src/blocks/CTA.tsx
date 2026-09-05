/**
 * packages/ui/src/blocks/CTA.tsx — the "one primary CTA" every hero page
 * (blueprint §5.2) must carry, plus an optional secondary/contextual link.
 *
 * Renders as `<h2>` (not `<h3>`) — this is always a standalone closing
 * section, never a subsection of whatever heading happens to precede it on
 * the page, so it needs a heading at that same top level.
 *
 * `imageUrl` swaps in a full-bleed photo + dark overlay treatment (a
 * deliberate visual bookend for a page that opened on a photographic hero)
 * instead of the flat tinted panel.
 */
import Image from 'next/image';
import { ButtonLink } from '../primitives/Button';

export interface CTAProps {
  heading: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  imageUrl?: string;
  imageAlt?: string;
}

export function CTA({ heading, body, primary, secondary, imageUrl, imageAlt }: CTAProps) {
  if (imageUrl) {
    return (
      <div className="relative flex min-h-[46vh] items-center justify-center overflow-hidden text-center">
        <Image src={imageUrl} alt={imageAlt ?? ''} fill sizes="100vw" className="object-cover" />
        {/* A flat tint alone left the body copy hard to read over busier
            regions of the photo, but darkening the image enough to fix that
            defeated the point of a photographic close — a text-shadow
            guarantees legibility without hiding the photo underneath it. */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 px-6 py-20" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.65)' }}>
          <h2 className="font-heading text-3xl font-semibold text-inverse sm:text-4xl">{heading}</h2>
          {body ? <p className="mx-auto mt-3 max-w-md text-inverse">{body}</p> : null}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href={primary.href} variant="accent">
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} className="border border-inverse/40 text-inverse hover:bg-inverse/10">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-site border border-foreground/10 bg-tint p-8 text-center shadow-sm sm:p-12">
      <h2 className="font-heading text-2xl font-semibold text-foreground">{heading}</h2>
      {body ? <p className="mt-2 text-foreground/70">{body}</p> : null}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <ButtonLink href={primary.href} variant="primary">
          {primary.label}
        </ButtonLink>
        {secondary ? (
          <ButtonLink href={secondary.href} variant="outline">
            {secondary.label}
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}
