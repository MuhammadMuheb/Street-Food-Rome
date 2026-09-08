'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
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

          <Link
            href="#"
            className="flex h-9 shrink-0 items-center gap-1.5 rounded-[6px] bg-[#ff0022] px-3 text-sm font-bold text-white sm:h-10 sm:px-4 sm:text-base"
          >
            View Tours
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="hidden sm:block">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <button
            type="button"
            className="hidden items-center gap-1.5 text-base font-medium text-[#2b2e2f] sm:flex"
          >
            <span className="text-base leading-none">🇺🇸</span>
            USD
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="relative" ref={accountRef}>
            <button
              type="button"
              aria-label="Account"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((open) => !open)}
              className="text-[#2b2e2f]"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4.5 20c0-4.1 3.4-6.8 7.5-6.8s7.5 2.7 7.5 6.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {accountOpen ? (
              <div className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-[#e8ebed] bg-white p-4 shadow-[0_16px_48px_rgba(45,51,57,0.18)]">
                <p className="text-sm font-bold text-[#1a1a1a]">Welcome to Street Food Rome</p>
                <p className="mt-1 text-xs text-[#9aa0a5]">Sign in to save tours and book faster.</p>

                <button
                  type="button"
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-[#e8ebed] text-sm font-bold text-[#1a1a1a] transition-colors hover:bg-[#f9fafa]"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
                    <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" />
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" />
                  </svg>
                  Continue With Google
                </button>

                <button
                  type="button"
                  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-[#e8ebed] text-sm font-bold text-[#1a1a1a] transition-colors hover:bg-[#f9fafa]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Sign In With Email
                </button>

                <button
                  type="button"
                  className="mt-2 flex h-11 w-full items-center justify-center rounded-[6px] bg-[#ff0022] text-sm font-bold text-white transition-colors hover:bg-[#e0001d]"
                >
                  Create Account
                </button>

                <p className="mt-3 text-center text-[11px] leading-relaxed text-[#9aa0a5]">
                  Sign-in isn&rsquo;t connected yet — coming soon.
                </p>
              </div>
            ) : null}
          </div>
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
