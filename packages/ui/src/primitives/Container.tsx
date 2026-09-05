/**
 * packages/ui/src/primitives/Container.tsx — max-width content wrapper shared
 * by every hero page and template layout. 1600px is deliberately wide: on a
 * large desktop monitor a narrower cap (5xl/7xl/1400px all read this way in
 * turn) still leaves a wide dead margin on both sides — this brings content
 * much closer to the viewport edge while the padding scale still keeps a
 * clean, intentional margin rather than a hard-clipped edge-to-edge bleed.
 */
import type { HTMLAttributes } from 'react';

export function Container({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-10 ${className}`} {...props} />;
}
