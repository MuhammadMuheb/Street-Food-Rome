'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { TourDoc } from '@/lib/firestore';

const ATTRACTIONS = [
  'Testaccio Market',
  "Campo de' Fiori Market",
  'Trastevere',
  'Jewish Ghetto',
  'Trevi Fountain',
  'Pantheon',
  'Piazza Navona',
  'Colosseum',
  'Vatican Museums',
  'Spanish Steps',
  'Monti',
  'Prati',
  'San Lorenzo',
  'Pigneto',
  'Villa Borghese',
  'Circus Maximus',
  'Piazza del Popolo',
  'Via del Corso',
  'Trionfale Market',
  'Garbatella',
];

const DESTINATIONS = [
  'Rome',
  'Vatican City',
  'Florence',
  'Tuscany',
  'Venice',
  'Naples',
  'Amalfi Coast',
  'Bologna',
  'Milan',
  'Sicily',
  'Cinque Terre',
  'Positano',
  'Sorrento',
  'Capri',
  'Umbria',
  'Piedmont',
  'Verona',
  'Turin',
  'Puglia',
  'Lake Como',
];

const TABS = ['Top Attractions', 'Top Destinations', 'Top Tours'] as const;
type Tab = (typeof TABS)[number];

export function ExploreLinksSection({ tours }: { tours: TourDoc[] }) {
  const [active, setActive] = useState<Tab>('Top Attractions');

  const tourLinks = [...tours.map((tour) => tour.title).slice(0, 19), 'All Rome Food Tours'];

  const lists: Record<Tab, string[]> = {
    'Top Attractions': ATTRACTIONS,
    'Top Destinations': DESTINATIONS,
    'Top Tours': tourLinks,
  };

  const items = lists[active];

  return (
    <section className="bg-[#f9fafa] py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        <h2 className="text-center font-sans text-xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-2xl">
          Places You Can Plan Your Next Trip
        </h2>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-[#eef0f1] p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                  active === tab
                    ? 'bg-white text-[#1a1a1a] shadow-[0_1px_3px_rgba(45,51,57,0.15)]'
                    : 'text-[#5c6166] hover:text-[#1a1a1a]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 md:gap-x-12">
          {items.map((label, index) => (
            <Link
              key={label}
              href="#"
              className="flex items-baseline gap-2 text-[15px] text-[#3b3e3f] transition-colors hover:text-[#ff0022]"
            >
              <span className="tabular-nums text-sm text-[#9aa0a5]">{index + 1}.</span>
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
