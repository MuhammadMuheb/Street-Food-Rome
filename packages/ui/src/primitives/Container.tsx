/**
 * packages/ui/src/primitives/Container.tsx — max-width content wrapper shared
 * by every hero page and template layout.
 */
import type { HTMLAttributes } from 'react';

export function Container({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-5xl px-4 ${className}`} {...props} />;
}
