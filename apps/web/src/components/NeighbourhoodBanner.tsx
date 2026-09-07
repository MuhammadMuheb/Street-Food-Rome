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
    <Link href={href} className="group relative flex h-56 items-end overflow-hidden rounded-2xl bg-ink sm:h-64">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(24,20,15,0.9) 0%, rgba(24,20,15,0.25) 60%, transparent 100%)' }}
      />
      <div className="relative flex w-full items-end justify-between p-6">
        <div>
          <h3 className="font-display text-2xl font-semibold text-paper sm:text-3xl">{name}</h3>
          <p className="mt-1 max-w-sm text-sm text-paper/75">{description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink">
          View Tours
        </span>
      </div>
    </Link>
  );
}
