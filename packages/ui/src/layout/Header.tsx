/**
 * packages/ui/src/layout/Header.tsx — site nav header. `navLinks` is passed
 * in rather than derived here — a hero site's page tree and a template's
 * nav are configured differently, this component only renders the result.
 *
 * Uses next/link (not a plain <a>) for these — they're always same-site
 * content pages, so a client-side transition avoids the full-page reload a
 * plain anchor would force. Contrast with TourCard/CTA/Hero's ButtonLink,
 * which stays a plain <a> because it always points at /go/:slug — a
 * same-origin redirect endpoint that also logs a click, where Link's
 * viewport prefetching would risk firing that side effect just by scrolling
 * the button into view.
 */
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '../primitives/Container';
import { MobileNavToggle } from './MobileNavToggle';

export interface HeaderNavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  siteName: string;
  /** Optional brand mark rendered before the site name — a bespoke hero
   * passes its own logo component; templates and heroes without one yet
   * simply render as text-only, unchanged from before this existed. */
  logo?: ReactNode;
  navLinks?: HeaderNavLink[];
}

export function Header({ siteName, logo, navLinks = [] }: HeaderProps) {
  return (
    <header className="relative border-b border-foreground/10 bg-background">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
          {logo}
          {siteName}
        </Link>
        {navLinks.length > 0 ? (
          <>
            {/* Desktop: full inline list. Below `sm`, this list would either
                wrap onto the brand name or overflow the viewport, so it's
                swapped for MobileNavToggle's hamburger + dropdown instead of
                shrinking font/spacing until it merely *looks* like it fits. */}
            <nav className="hidden sm:block">
              <ul className="flex gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-medium text-foreground/80 hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <MobileNavToggle navLinks={navLinks} />
          </>
        ) : null}
      </Container>
    </header>
  );
}
