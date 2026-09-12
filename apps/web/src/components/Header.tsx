'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AccountMenu } from './AccountMenu';
import { ViewToursMenu } from './ViewToursMenu';

export function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const isHomepage = usePathname() === '/';

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 h-[65px] border-b border-[#e8ebed] bg-white ${
        hidden ? '-translate-y-full transition-transform duration-300 ease-in-out' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-2 px-6 sm:px-14">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff0022] text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 3v7a2 2 0 0 0 2 2v9M6 3a2 2 0 0 0-2 2M6 3a2 2 0 0 1 2 2v5M18 3c-1.6 0-3 2-3 6s1.4 5 3 5v7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="whitespace-nowrap text-base font-bold tracking-tight text-[#1a1a1a] sm:text-lg">
              street food rome
            </span>
          </Link>

          <ViewToursMenu />
        </div>

        {isHomepage ? null : (
          <form
            action="#"
            className="hidden min-w-0 max-w-[420px] flex-1 items-center gap-2 rounded-[6px] border border-[#e8ebed] px-3 lg:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#9aa0a5]" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              name="q"
              placeholder="Rome, Trastevere, Testaccio…"
              className="h-9 w-full min-w-0 bg-transparent text-sm text-[#1a1a1a] placeholder:text-[#9aa0a5] focus:outline-none"
            />
            <button
              type="submit"
              className="h-8 shrink-0 whitespace-nowrap rounded-[6px] border border-[#ff0022] px-3 text-sm font-medium text-[#ff0022]"
            >
              Search Tours
            </button>
          </form>
        )}

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <AccountMenu />
          <button type="button" aria-label="Bag" className="text-[#2b2e2f]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 8V6a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.6" />
              <rect x="3.5" y="8" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
