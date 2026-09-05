/**
 * packages/templates/src/t1-monument/blocks/LandmarkGallery.tsx — photo grid
 * of first-hand landmark visit photos (M8 Media/Photo).
 */
import { Section } from '@italy-tours/ui';

export interface LandmarkGalleryImage {
  url: string;
  alt: string;
}

export interface LandmarkGalleryProps {
  images: LandmarkGalleryImage[];
}

export function LandmarkGallery({ images }: LandmarkGalleryProps) {
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
