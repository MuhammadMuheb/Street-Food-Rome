'use client';

/**
 * packages/ui/src/layout/MobileNavToggle.tsx — hamburger menu for Header on
 * small screens. Split out as its own client component (not folded into
 * Header itself) so Header stays a server component everywhere except this
 * one interactive sliver — same isolation principle as StickyCTA.
 */
import { useState } from 'react';
import Link from 'next/link';
import type { HeaderNavLink } from './Header';

export function MobileNavToggle({ navLinks }: { navLinks: HeaderNavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex h-9 w-9 items-center justify-center rounded-site text-foreground"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {open ? (
            <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 11H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <nav className="absolute inset-x-0 top-full border-b border-foreground/10 bg-background shadow-lg">
          <ul className="flex flex-col divide-y divide-foreground/10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
