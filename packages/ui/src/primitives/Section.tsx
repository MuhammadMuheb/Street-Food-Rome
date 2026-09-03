/**
 * packages/ui/src/primitives/Section.tsx — vertical rhythm wrapper for a page
 * section, with an optional heading.
 */
import type { HTMLAttributes, ReactNode } from 'react';
import { Container } from './Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  heading?: ReactNode;
  containerClassName?: string;
}

export function Section({ heading, containerClassName = '', className = '', children, ...props }: SectionProps) {
  return (
    <section className={`py-12 ${className}`} {...props}>
      <Container className={containerClassName}>
        {heading ? (
          <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground">{heading}</h2>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
