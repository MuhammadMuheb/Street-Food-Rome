'use client';

/**
 * packages/ui/src/layout/StickyCTA.tsx — bottom-anchored persistent booking
 * CTA, shown on money pages. Client component: it's fixed-position chrome,
 * not content, so it doesn't need to be part of the server-rendered flow.
 */
import { ButtonLink } from '../primitives/Button';

export interface StickyCTAProps {
  label: string;
  href: string;
}

export function StickyCTA({ label, href }: StickyCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-background/95 p-3 backdrop-blur sm:hidden">
      <ButtonLink href={href} variant="accent" className="w-full">
        {label}
      </ButtonLink>
    </div>
  );
}
