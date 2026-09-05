/**
 * packages/ui/src/primitives/Section.tsx — vertical rhythm wrapper for a page
 * section, with an optional kicker/heading/lede.
 *
 * `tint` swaps to the alternate `bg-tint` surface (globals.css's
 * --surface-tint) — used to break up a page of otherwise-identical white
 * sections without hardcoding a color per call site. `padding` varies the
 * section's own vertical rhythm ('sm'/'md'/'lg') — a page whose every
 * section uses the same padding reads as a template; a hero, a quote, and a
 * dense list all warrant a different amount of air around them.
 */
import type { HTMLAttributes, ReactNode } from 'react';
import { Container } from './Container';

const PADDING: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'py-16 sm:py-20',
  md: 'py-20 sm:py-28',
  lg: 'py-24 sm:py-36',
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  kicker?: ReactNode;
  heading?: ReactNode;
  lede?: ReactNode;
  containerClassName?: string;
  tint?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Section({
  kicker,
  heading,
  lede,
  containerClassName = '',
  tint = false,
  padding = 'md',
  className = '',
  children,
  ...props
}: SectionProps) {
  return (
    <section className={`${PADDING[padding]} ${tint ? 'bg-tint' : ''} ${className}`} {...props}>
      <Container className={containerClassName}>
        {kicker ? (
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-5 before:bg-accent">
            {kicker}
          </p>
        ) : null}
        {heading ? (
          <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
        ) : null}
        {lede ? <p className="mt-3.5 max-w-2xl text-base text-foreground/65 sm:text-[17px]">{lede}</p> : null}
        {heading || lede ? <div className="mt-10 sm:mt-14">{children}</div> : children}
      </Container>
    </section>
  );
}
