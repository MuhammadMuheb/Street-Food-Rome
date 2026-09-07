import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/rome-street-food-tour', label: 'Food Tours' },
  { href: '/best-neighbourhoods-for-food', label: 'Neighbourhoods' },
  { href: '/rome-market-guide', label: 'Markets' },
  { href: '/about', label: 'About' },
];

export function Header() {
  return (
    <div className="sticky top-0 z-40">
      {/* Slim utility bar */}
      <div className="border-b border-line bg-paper">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-end gap-4 px-6 text-xs font-medium text-ink-muted">
          <a href="mailto:hello@streetfoodrome.com" className="hover:text-ink">hello@streetfoodrome.com</a>
          <span className="h-3 w-px bg-line-strong" aria-hidden="true" />
          <Link href="/contact" className="hover:text-ink">Contact</Link>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-paper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 3v7a2 2 0 0 0 2 2v9M6 3a2 2 0 0 0-2 2M6 3a2 2 0 0 1 2 2v5M18 3c-1.6 0-3 2-3 6s1.4 5 3 5v7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Street Food Rome
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#tours"
            className="flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-hover"
          >
            See Tours
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Accent divider */}
      <div className="h-[3px] bg-accent" />
    </div>
  );
}
