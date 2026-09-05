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
import { ThemeToggle } from './ThemeToggle';

export interface HeaderNavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  siteName: string;
  /** Optional brand mark rendered in place of the plain-text site name — a
   * bespoke hero passes its own full logo lockup (icon + wordmark already
   * drawn together); templates and heroes without one yet fall back to
   * `siteName` as text, unchanged from before this existed. When a logo is
   * given, `siteName` still carries the link's accessible name instead of
   * rendering twice next to it. */
  logo?: ReactNode;
  navLinks?: HeaderNavLink[];
  /** Opt-in — only a site with its own light/dark logo variants and a
   * theme built for both should show this (currently just streetfoodrome).
   * Every other caller renders exactly as before. */
  showThemeToggle?: boolean;
}

export function Header({ siteName, logo, navLinks = [], showThemeToggle = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur-md transition-all">
      <Container className="flex w-full items-center justify-between gap-8 py-6">
        <Link
          href="/"
          aria-label={logo ? siteName : undefined}
          className="flex shrink-0 items-center gap-2 font-heading text-lg font-bold text-foreground"
        >
          {logo ?? siteName}
        </Link>
        <div className="flex items-center gap-6 lg:gap-8">
          {navLinks.length > 0 ? (
            <>
              {/* Desktop: full inline list. Below `sm`, this list would either
                  wrap onto the brand name or overflow the viewport, so it's
                  swapped for MobileNavToggle's hamburger + dropdown instead of
                  shrinking font/spacing until it merely *looks* like it fits. */}
              <nav className="hidden sm:block">
                <ul className="flex items-center gap-10 lg:gap-14">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <MobileNavToggle navLinks={navLinks} />
            </>
          ) : null}
          {showThemeToggle ? <ThemeToggle /> : null}
        </div>
      </Container>
    </header>
  );
}
