/**
 * apps/web/src/sites/streetfoodrome/components/NeighbourhoodGuide.tsx —
 * bespoke body-copy section for /best-neighbourhoods-for-food and similar
 * support pages, paired with an image where one is available — a text-only
 * column reads as a placeholder no matter how good the copy is.
 *
 * `heading` is a section label ("What to expect", "The short version") —
 * never the page's own title. Repeating the H1 verbatim as the very next
 * heading reads as a mistake, not emphasis.
 */
import Image from 'next/image';
import { Section } from '@italy-tours/ui';

export interface NeighbourhoodGuideProps {
  kicker?: string;
  heading?: string;
  lede?: string;
  bodyHtml: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  tint?: boolean;
}

export function NeighbourhoodGuide({
  kicker,
  heading,
  lede,
  bodyHtml,
  imageUrl,
  imageAlt,
  imageCaption,
  tint,
}: NeighbourhoodGuideProps) {
  return (
    <Section kicker={kicker} heading={heading} lede={lede} tint={tint}>
      <div className={imageUrl ? 'grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16' : ''}>
        <div
          className="prose max-w-none text-foreground/75 prose-p:leading-relaxed"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
        {imageUrl ? (
          <figure className="m-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-site">
              <Image
                src={imageUrl}
                alt={imageAlt ?? ''}
                fill
                priority
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
            {imageCaption ? <figcaption className="mt-3 text-xs italic text-foreground/50">{imageCaption}</figcaption> : null}
          </figure>
        ) : null}
      </div>
    </Section>
  );
}
