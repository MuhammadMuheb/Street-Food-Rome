'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPostDoc, TourDoc } from '@/lib/firestore';
import { NEIGHBORHOODS, getBlogPostForLandmark, tourHref } from '@/lib/tours';

/** Neighbourhood/market items link to /neighborhoods/{slug}; pure landmarks (no dedicated
 *  hub page exists or is planned for them) link to a matching blog post via `landmarkSlug`,
 *  falling back to /blog when no post is tagged for that landmark yet — never inert text. */
const ATTRACTIONS: { label: string; neighborhoodSlug: string | null; landmarkSlug: string | null }[] = [
  { label: 'Testaccio Market', neighborhoodSlug: 'testaccio', landmarkSlug: null },
  { label: "Campo de' Fiori Market", neighborhoodSlug: 'campo-de-fiori', landmarkSlug: null },
  { label: 'Trastevere', neighborhoodSlug: 'trastevere', landmarkSlug: null },
  { label: 'Jewish Ghetto', neighborhoodSlug: 'jewish-ghetto', landmarkSlug: null },
  { label: 'Trevi Fountain', neighborhoodSlug: null, landmarkSlug: 'trevi-fountain' },
  { label: 'Pantheon', neighborhoodSlug: null, landmarkSlug: 'pantheon' },
  { label: 'Piazza Navona', neighborhoodSlug: null, landmarkSlug: 'piazza-navona' },
  { label: 'Colosseum', neighborhoodSlug: null, landmarkSlug: 'colosseum' },
  { label: 'Vatican Museums', neighborhoodSlug: null, landmarkSlug: 'vatican-museums' },
  { label: 'Spanish Steps', neighborhoodSlug: null, landmarkSlug: 'spanish-steps' },
  { label: 'Monti', neighborhoodSlug: 'monti', landmarkSlug: null },
  { label: 'Prati', neighborhoodSlug: 'prati', landmarkSlug: null },
  { label: 'San Lorenzo', neighborhoodSlug: 'san-lorenzo', landmarkSlug: null },
  { label: 'Pigneto', neighborhoodSlug: 'pigneto', landmarkSlug: null },
  { label: 'Villa Borghese', neighborhoodSlug: null, landmarkSlug: 'villa-borghese' },
  { label: 'Circus Maximus', neighborhoodSlug: null, landmarkSlug: 'circus-maximus' },
  { label: 'Piazza del Popolo', neighborhoodSlug: null, landmarkSlug: 'piazza-del-popolo' },
  { label: 'Via del Corso', neighborhoodSlug: null, landmarkSlug: 'via-del-corso' },
  { label: 'Trionfale Market', neighborhoodSlug: 'trionfale', landmarkSlug: null },
  { label: 'Garbatella', neighborhoodSlug: 'garbatella', landmarkSlug: null },
];

const TABS = ['Top Attractions', 'Top Destinations', 'Top Tours'] as const;
type Tab = (typeof TABS)[number];

interface LinkItem {
  label: string;
  href: string | null;
}

export function ExploreLinksSection({ tours, allBlogPosts }: { tours: TourDoc[]; allBlogPosts: BlogPostDoc[] }) {
  const [active, setActive] = useState<Tab>('Top Attractions');

  const attractionItems: LinkItem[] = ATTRACTIONS.map((a) => {
    if (a.neighborhoodSlug) return { label: a.label, href: `/neighborhoods/${a.neighborhoodSlug}` };
    if (a.landmarkSlug) {
      const post = getBlogPostForLandmark(allBlogPosts, a.landmarkSlug);
      return { label: a.label, href: post ? `/blog/${post.slug}` : '/blog' };
    }
    return { label: a.label, href: '/blog' };
  });

  // "Top Destinations" used to be a legacy multi-city list left over from a former
  // multi-tenant platform; this is a single-city site now, so it points at the same
  // 10 Rome neighbourhoods as the "Top Attractions" tab instead.
  const destinationItems: LinkItem[] = NEIGHBORHOODS.map((n) => ({
    label: n.name,
    href: `/neighborhoods/${n.slug}`,
  }));

  const tourItems: LinkItem[] = [
    ...tours.slice(0, 19).map((tour) => ({ label: tour.title, href: tourHref(tour.slug) })),
    { label: 'All Rome Food Tours', href: '/tours' },
  ];

  const lists: Record<Tab, LinkItem[]> = {
    'Top Attractions': attractionItems,
    'Top Destinations': destinationItems,
    'Top Tours': tourItems,
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
          {items.map((item, index) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-baseline gap-2 text-[15px] text-[#3b3e3f] transition-colors hover:text-[#ff0022]"
              >
                <span className="tabular-nums text-sm text-[#9aa0a5]">{index + 1}.</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ) : (
              <span key={item.label} className="flex items-baseline gap-2 text-[15px] text-[#3b3e3f]">
                <span className="tabular-nums text-sm text-[#9aa0a5]">{index + 1}.</span>
                <span className="font-medium">{item.label}</span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
