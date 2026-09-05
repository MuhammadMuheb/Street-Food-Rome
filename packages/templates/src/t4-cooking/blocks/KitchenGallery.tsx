/**
 * packages/templates/src/t4-cooking/blocks/KitchenGallery.tsx — photo grid of
 * first-hand kitchen/class photos (M8 Media/Photo).
 */
import { Section } from '@italy-tours/ui';

export interface KitchenGalleryImage {
  url: string;
  alt: string;
}

export interface KitchenGalleryProps {
  images: KitchenGalleryImage[];
}

export function KitchenGallery({ images }: KitchenGalleryProps) {
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
