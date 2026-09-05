/**
 * packages/ui/src/blocks/EditorialBreak.tsx — a full-bleed photograph between
 * two text sections, no text of its own beyond an optional small caption.
 * Purely a rhythm device: a page of stacked text sections reads flat no
 * matter how well each one is written — a pure-photography break interrupts
 * that and gives the eye somewhere to rest.
 */
import Image from 'next/image';

export interface EditorialBreakProps {
  src: string;
  alt: string;
  caption?: string;
}

export function EditorialBreak({ src, alt, caption }: EditorialBreakProps) {
  return (
    <div className="relative h-[40vh] min-h-[260px] w-full overflow-hidden sm:h-[52vh]">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
      {caption ? (
        <p className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.1em] text-inverse sm:bottom-7 sm:left-8">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
