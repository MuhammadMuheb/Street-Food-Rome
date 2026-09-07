import Link from 'next/link';

const GUIDES = [
  { href: '/rome-street-food-tour', label: 'Rome Street Food Tour' },
  { href: '/trastevere-food-tour', label: 'Trastevere Food Tour' },
  { href: '/testaccio-market-tour', label: 'Testaccio Market Tour' },
  { href: '/rome-food-wine-tour', label: 'Rome Food & Wine Tour' },
  { href: '/aperitivo-evening-tour', label: 'Rome Aperitivo Tour' },
];

const GUIDES_2 = [
  { href: '/best-neighbourhoods-for-food', label: 'Best Neighbourhoods for Food' },
  { href: '/rome-market-guide', label: "Rome's Food Markets, Ranked" },
  { href: '/gelato-done-right', label: 'The Best Gelato in Rome' },
  { href: '/rome-coffee-culture', label: 'Rome Coffee Culture' },
  { href: '/what-you-actually-eat', label: 'What to Actually Expect' },
];

const COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-lg font-semibold">Street Food Rome</span>
            <p className="mt-3 max-w-xs text-sm text-paper/60">
              A first-hand guide to eating well in Rome, written by a 12-year resident who eats
              everywhere before it goes on the site.
            </p>
          </div>

          <FooterColumn heading="Food Tours" links={GUIDES} />
          <FooterColumn heading="Guides" links={GUIDES_2} />
          <FooterColumn heading="Company" links={COMPANY} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Street Food Rome. All rights reserved.</p>
          <p>We earn a commission when you book through links on this site, at no extra cost to you.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">{heading}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-paper/80 transition-colors hover:text-paper">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
