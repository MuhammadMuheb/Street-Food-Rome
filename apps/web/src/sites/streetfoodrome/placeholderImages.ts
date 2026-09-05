/**
 * apps/web/src/sites/streetfoodrome/placeholderImages.ts — curated stand-in
 * photography (real, freely-licensed Rome street-food/trattoria photos,
 * stored under public/images/placeholders) used until real Tours/Pages
 * carry their own uploaded `heroImage`/`imageUrl`. Every `imageUrl` a real
 * Page or Tour doc supplies still wins — these are fallbacks, not overrides
 * (see each call site's `??`).
 *
 * Every entry is a real photograph of an actual Rome trattoria/market/dish —
 * not a generic stock texture — so the placeholder itself still looks
 * considered rather than like a gap waiting to be filled.
 */
export interface PlaceholderImage {
  src: string;
  alt: string;
}

export const PLACEHOLDER_IMAGES = {
  heroPizzeria: { src: '/images/placeholders/hero-pizzeria.jpg', alt: 'A pizzeria terrace on a Trastevere cobblestone street at golden hour' },
  streetScene: { src: '/images/placeholders/street-scene.jpg', alt: 'A leafy, vine-covered Trastevere alley with an outdoor trattoria' },
  marketProduce: { src: '/images/placeholders/market-produce.jpg', alt: 'A Roman market stall piled with fresh produce, strawberries, and citrus' },
  diningOutdoor: { src: '/images/placeholders/dining-outdoor.jpg', alt: 'Diners at an outdoor ristorante and pizzeria on a Rome street corner' },
  cafeOutdoor: { src: '/images/placeholders/cafe-outdoor.jpg', alt: 'An ivy-covered bar and gelateria on a Rome street corner at dusk' },
  pizzeriaLights: { src: '/images/placeholders/pizzeria-lights.jpg', alt: 'A wood-fired pizzeria terrace glowing with string lights in the evening' },
  pastaDish: { src: '/images/placeholders/pasta-dish.jpg', alt: 'A plate of fresh linguine with shrimp and cherry tomatoes' },
  gelatoFlavors: { src: '/images/placeholders/gelato-flavors.jpg', alt: 'A gelato case with hand-labeled flavors including churros and dulce de leche' },
  aperitivoSpritz: { src: '/images/placeholders/aperitivo-spritz.jpg', alt: 'A spritz on a rooftop terrace at golden hour, overlooking Rome rooftops' },
  trattoriaTables: { src: '/images/placeholders/trattoria-tables.jpg', alt: 'Outdoor tables at a Roman trattoria on a piazza, string lights overhead' },
} as const satisfies Record<string, PlaceholderImage>;

/** Fallback hero image per Page slug — matched by theme where a real photo would go. */
export const HERO_IMAGE_BY_SLUG: Record<string, PlaceholderImage> = {
  home: PLACEHOLDER_IMAGES.heroPizzeria,
  'rome-street-food-tour': PLACEHOLDER_IMAGES.diningOutdoor,
  'trastevere-food-tour': PLACEHOLDER_IMAGES.streetScene,
  'testaccio-market-tour': PLACEHOLDER_IMAGES.marketProduce,
  'rome-food-wine-tour': PLACEHOLDER_IMAGES.trattoriaTables,
  'aperitivo-evening-tour': PLACEHOLDER_IMAGES.aperitivoSpritz,
  'what-you-actually-eat': PLACEHOLDER_IMAGES.pastaDish,
  'best-neighbourhoods-for-food': PLACEHOLDER_IMAGES.cafeOutdoor,
  'rome-market-guide': PLACEHOLDER_IMAGES.marketProduce,
  'gelato-done-right': PLACEHOLDER_IMAGES.gelatoFlavors,
  'rome-coffee-culture': PLACEHOLDER_IMAGES.cafeOutdoor,
  about: PLACEHOLDER_IMAGES.streetScene,
  contact: PLACEHOLDER_IMAGES.diningOutdoor,
  instagram: PLACEHOLDER_IMAGES.pizzeriaLights,
};

/** Fallback card image per Tour slug (packages/affiliate cloaked-link slug, not the Page slug). */
export const TOUR_IMAGE_BY_SLUG: Record<string, PlaceholderImage> = {
  'trastevere-food-wine-walk': PLACEHOLDER_IMAGES.diningOutdoor,
  'testaccio-market-food-tour': PLACEHOLDER_IMAGES.marketProduce,
  'rome-food-wine-tasting': PLACEHOLDER_IMAGES.trattoriaTables,
  'aperitivo-evening-experience': PLACEHOLDER_IMAGES.aperitivoSpritz,
};

function tourSlugFromHref(href: string): string {
  return href.split('/go/')[1] ?? '';
}

/** The full-bleed image used for the mid-page editorial break — varies by
 * page so two adjacent money pages don't show the identical break photo. */
export function editorialBreakImage(pageSlug: string): PlaceholderImage {
  const pool = [PLACEHOLDER_IMAGES.streetScene, PLACEHOLDER_IMAGES.cafeOutdoor, PLACEHOLDER_IMAGES.trattoriaTables, PLACEHOLDER_IMAGES.pizzeriaLights];
  let hash = 0;
  for (let i = 0; i < pageSlug.length; i += 1) hash = (hash * 31 + pageSlug.charCodeAt(i)) >>> 0;
  return pool[hash % pool.length] ?? PLACEHOLDER_IMAGES.streetScene;
}

/** Deterministic per-item image for a list with no image data of its own
 * (market cards, dish cards) — same input always gets the same image, so it
 * doesn't shuffle between requests/renders. */
export function itemImage(seed: string): PlaceholderImage {
  const pool = [PLACEHOLDER_IMAGES.marketProduce, PLACEHOLDER_IMAGES.pastaDish, PLACEHOLDER_IMAGES.gelatoFlavors, PLACEHOLDER_IMAGES.trattoriaTables, PLACEHOLDER_IMAGES.cafeOutdoor];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[hash % pool.length] ?? PLACEHOLDER_IMAGES.marketProduce;
}

export function tourImage(href: string): PlaceholderImage {
  return TOUR_IMAGE_BY_SLUG[tourSlugFromHref(href)] ?? PLACEHOLDER_IMAGES.diningOutdoor;
}

export function heroImageForSlug(slug: string): PlaceholderImage {
  return HERO_IMAGE_BY_SLUG[slug] ?? PLACEHOLDER_IMAGES.heroPizzeria;
}
