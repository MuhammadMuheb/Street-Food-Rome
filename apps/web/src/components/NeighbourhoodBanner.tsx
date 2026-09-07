import Image from 'next/image';
import Link from 'next/link';

interface NeighbourhoodBannerProps {
  name: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  href: string;
}

export function NeighbourhoodBanner({ name, imageUrl, imageAlt, description, href }: NeighbourhoodBannerProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-72 items-end overflow-hidden rounded-2xl bg-ink"
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="relative w-full p-7">
        <h3 className="font-display text-2xl font-semibold text-paper">{name}</h3>
        <p className="mt-1.5 max-w-sm text-sm text-paper/75">{description}</p>
        <span className="mt-4 inline-block rounded-full bg-paper px-4 py-2 text-xs font-semibold text-ink">
          Read the guide
        </span>
      </div>
    </Link>
  );
}
