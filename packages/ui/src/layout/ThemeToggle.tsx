'use client';

/**
 * packages/ui/src/layout/ThemeToggle.tsx — light/dark mode switch.
 *
 * Toggles the `.dark` class on <html> (Tailwind's `darkMode: 'class'`,
 * apps/web/tailwind.config.ts) and persists the choice to localStorage.
 * The class is applied before first paint by a small blocking script in
 * apps/web/src/app/(site)/layout.tsx's <head> — reading it back here on
 * mount (rather than defaulting this component's own state) is what keeps
 * the icon in sync with whatever that script already decided, instead of
 * this component racing it with a second, possibly-conflicting guess.
 *
 * No system-preference detection — an explicit, predictable default (light,
 * until a visitor actually flips it) rather than a page that silently
 * renders dark for anyone with a dark OS theme who never asked this site
 * for that.
 */
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sfr-theme';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // Private browsing / storage disabled — the toggle still works for
      // this page view, it just won't be remembered next visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:bg-foreground/5"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M14 9.5A6 6 0 0 1 6.5 2 6.5 6.5 0 1 0 14 9.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.3" />
          <path
            d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.7 3.3l-1.1 1.1M4.4 11.6l-1.1 1.1M12.7 12.7l-1.1-1.1M4.4 4.4 3.3 3.3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
