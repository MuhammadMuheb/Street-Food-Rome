'use client';

import { useState } from 'react';
import Link from 'next/link';

const TABS = {
  Tours: [
    { href: '/rome-street-food-tour', label: 'The Rome Street Food Tour Worth Your Evening' },
    { href: '/trastevere-food-tour', label: 'Eating Your Way Through Trastevere' },
    { href: '/testaccio-market-tour', label: 'Testaccio Market: Rome Eating Like a Local' },
    { href: '/rome-food-wine-tour', label: 'Rome Food and Wine, Properly Paired' },
    { href: '/aperitivo-evening-tour', label: 'The Rome Aperitivo Tour: Golden Hour Done Right' },
  ],
  Guides: [
    { href: '/best-neighbourhoods-for-food', label: 'The Best Neighbourhoods for Food in Rome' },
    { href: '/rome-market-guide', label: "Rome's Food Markets, Ranked" },
    { href: '/gelato-done-right', label: 'The Best Gelato in Rome (Not the Neon Kind)' },
    { href: '/rome-coffee-culture', label: "A Visitor's Guide to Rome Coffee Culture" },
    { href: '/what-you-actually-eat', label: 'Rome Food Tour: What to Actually Expect' },
  ],
} as const;

const NEIGHBOURHOOD_COLUMNS = [
  ['Trastevere', 'Testaccio', 'Jewish Ghetto', 'Monti'],
  ['Prati', 'Campo de’ Fiori', 'Trionfale', 'San Lorenzo'],
  ['Pigneto', 'Garbatella', 'Esquilino', 'Aventino'],
];

export function SeoLinkFarm() {
  const [activeTab, setActiveTab] = useState<keyof typeof TABS>('Tours');

  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center font-display text-3xl font-semibold text-ink">
          Plan Your Rome Food Itinerary
        </h2>

        <div className="mt-8 flex justify-center gap-2">
          {(Object.keys(TABS) as (keyof typeof TABS)[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab ? 'bg-accent text-paper' : 'bg-paper-tint text-ink-muted hover:text-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {TABS[activeTab].map((link, index) => (
            <li key={link.href} className="flex gap-3 text-sm">
              <span className="text-ink-muted">{index + 1}.</span>
              <Link href={link.href} className="text-ink transition-colors hover:text-accent">
                {link.label}
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-line pt-12 text-center">
          <h3 className="font-display text-xl font-semibold text-ink">Neighbourhoods We Cover</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
            A wider list of possibilities — guides for the four in bold below, notes for the rest.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-2 text-left sm:grid-cols-3">
            {NEIGHBOURHOOD_COLUMNS.flat().map((n) => (
              <span key={n} className="text-sm text-ink-muted">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
