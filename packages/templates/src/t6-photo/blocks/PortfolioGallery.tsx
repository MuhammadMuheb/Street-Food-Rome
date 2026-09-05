/**
 * packages/templates/src/t6-photo/blocks/PortfolioGallery.tsx — photo grid of
 * first-hand session portfolio photos (M8 Media/Photo — the T6 pack's core
 * visual asset).
 */
import { Section } from '@italy-tours/ui';

export interface PortfolioGalleryImage {
  url: string;
  alt: string;
}

export interface PortfolioGalleryProps {
  images: PortfolioGalleryImage[];
}

export function PortfolioGallery({ images }: PortfolioGalleryProps) {
  if (images.length === 0) return null;

  return (
    <Section heading="What it actually looks like">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {images.map((image) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.url}
            src={image.url}
            alt={image.alt}
            className="aspect-square w-full rounded-site object-cover"
          />
        ))}
      </div>
    </Section>
  );
}
