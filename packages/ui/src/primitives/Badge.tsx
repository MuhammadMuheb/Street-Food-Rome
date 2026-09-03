/**
 * packages/ui/src/primitives/Badge.tsx — small labeled tag, e.g. a price band
 * or niche label on a TourCard.
 */
import type { HTMLAttributes } from 'react';

export function Badge({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-block rounded-site bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent ${className}`}
      {...props}
    />
  );
}
