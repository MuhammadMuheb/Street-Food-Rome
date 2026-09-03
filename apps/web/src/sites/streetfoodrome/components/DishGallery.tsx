/**
 * apps/web/src/sites/streetfoodrome/components/DishGallery.tsx — bespoke
 * masonry-ish dish photo strip; visually distinct from T3's DishGallery grid.
 */
import { Section } from '@italy-tours/ui';

export interface DishGalleryImage {
  url: string;
  alt: string;
}

export function DishGallery({ images }: { images: DishGalleryImage[] }) {
  if (images.length === 0) return null;

  return (
    <Section heading="What you're actually eating">
      <div className="flex snap-x gap-3 overflow-x-auto pb-2">
        {images.map((image) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.url}
            src={image.url}
            alt={image.alt}
            className="h-64 w-48 shrink-0 snap-start rounded-site object-cover"
          />
        ))}
      </div>
    </Section>
  );
}
