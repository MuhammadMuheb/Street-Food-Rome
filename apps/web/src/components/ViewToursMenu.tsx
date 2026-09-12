'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, NEIGHBORHOODS } from '@/lib/tours';

interface NavItem {
  label: string;
  href: string;
}

const PAGES: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const TOURS_AND_BLOG: NavItem[] = [
  { label: 'All Tours', href: '/tours' },
  ...CATEGORIES.map((c) => ({ label: `${c.name} Tours`, href: `/tours/category/${c.slug}` })),
  { label: 'Blog', href: '/blog' },
];

const NEIGHBORHOOD_LINKS: NavItem[] = NEIGHBORHOODS.map((n) => ({
  label: n.name,
  href: `/neighborhoods/${n.slug}`,
}));

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9aa0a5]">{children}</p>;
}

const linkClass = 'text-sm text-[#3b3e3f] transition-colors hover:text-[#ff0022]';

export function ViewToursMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[6px] bg-[#ff0022] px-3 text-sm font-bold text-white sm:h-10 sm:px-4 sm:text-base"
      >
        View Tours
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`hidden transition-transform sm:block ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-x-4 top-[73px] z-50 max-h-[calc(100vh-90px)] overflow-y-auto rounded-2xl border border-[#e8ebed] bg-white p-6 shadow-[0_16px_48px_rgba(45,51,57,0.18)] sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-3 sm:max-h-none sm:w-[92vw] sm:max-w-[560px] sm:overflow-visible">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <ColumnHeading>Pages</ColumnHeading>
              <ul className="mt-3 space-y-2.5">
                {PAGES.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnHeading>Tours &amp; Blog</ColumnHeading>
              <ul className="mt-3 space-y-2.5">
                {TOURS_AND_BLOG.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <ColumnHeading>Explore by Neighbourhood</ColumnHeading>
              <ul className="mt-3 space-y-2.5">
                {NEIGHBORHOOD_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
