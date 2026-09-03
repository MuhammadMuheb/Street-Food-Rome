/**
 * packages/templates/src/t3-food/blocks/DishGallery.tsx — photo grid of
 * first-hand dish photos (M8 Media/Photo — the T3 pack's core visual asset).
 */
import { Section } from '@italy-tours/ui';

export interface DishGalleryImage {
  url: string;
  alt: string;
}

export interface DishGalleryProps {
  images: DishGalleryImage[];
}

export function DishGallery({ images }: DishGalleryProps) {
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
