import Image from 'next/image';
import Link from 'next/link';

interface PhotoGridCardProps {
  href: string;
  imageUrl: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  priceBand?: string | null;
}

export function PhotoGridCard({ href, imageUrl, imageAlt, eyebrow, title, priceBand }: PhotoGridCardProps) {
  return (
    <Link href={href} className="group relative block h-64 overflow-hidden rounded-2xl bg-ink">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(24,20,15,0.85) 0%, rgba(24,20,15,0.15) 55%, transparent 100%)' }}
      />
      {priceBand ? (
        <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">
          {priceBand}
        </span>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-paper/70">{eyebrow}</p>
        <p className="font-display text-xl font-semibold text-paper">{title}</p>
      </div>
    </Link>
  );
}
