import Link from 'next/link';

const LINKS = [
  { href: '/rome-street-food-tour', label: 'The Rome Street Food Tour Worth Your Evening' },
  { href: '/trastevere-food-tour', label: 'Eating Your Way Through Trastevere' },
  { href: '/testaccio-market-tour', label: 'Testaccio Market: Rome Eating Like a Local' },
  { href: '/rome-food-wine-tour', label: 'Rome Food and Wine, Properly Paired' },
  { href: '/aperitivo-evening-tour', label: 'The Rome Aperitivo Tour: Golden Hour Done Right' },
  { href: '/best-neighbourhoods-for-food', label: 'The Best Neighbourhoods for Food in Rome' },
  { href: '/rome-market-guide', label: "Rome's Food Markets, Ranked" },
  { href: '/gelato-done-right', label: 'The Best Gelato in Rome (Not the Neon Kind)' },
  { href: '/rome-coffee-culture', label: "A Visitor's Guide to Rome Coffee Culture" },
  { href: '/what-you-actually-eat', label: 'Rome Food Tour: What to Actually Expect' },
];

const NEIGHBOURHOODS = [
  'Trastevere', 'Testaccio', 'Jewish Ghetto', 'Monti', 'Prati',
  'Campo de’ Fiori', 'Trionfale', 'San Lorenzo', 'Pigneto', 'Garbatella',
];

export function SeoLinkFarm() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center font-display text-3xl font-semibold text-ink">
          Everything on Street Food Rome
        </h2>

        <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {LINKS.map((link, index) => (
            <li key={link.href} className="flex gap-3 text-sm">
              <span className="text-ink-muted">{index + 1}.</span>
              <Link href={link.href} className="text-ink transition-colors hover:text-accent">
                {link.label}
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-14 border-t border-line pt-10 text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Neighbourhoods we cover
          </h3>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {NEIGHBOURHOODS.map((n) => (
              <span key={n} className="rounded-full border border-line-strong px-4 py-1.5 text-sm text-ink-muted">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
