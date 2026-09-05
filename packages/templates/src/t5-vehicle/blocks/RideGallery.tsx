/**
 * packages/templates/src/t5-vehicle/blocks/RideGallery.tsx — photo grid of
 * first-hand ride photos (M8 Media/Photo).
 */
import { Section } from '@italy-tours/ui';

export interface RideGalleryImage {
  url: string;
  alt: string;
}

export interface RideGalleryProps {
  images: RideGalleryImage[];
}

export function RideGallery({ images }: RideGalleryProps) {
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
