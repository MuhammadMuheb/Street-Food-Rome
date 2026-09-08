/**
 * Deliberately generic, representative publication-style names — not real
 * outlets. Street Food Rome hasn't actually been featured by any press yet,
 * so naming real, identifiable news organizations here would be a false
 * endorsement claim, not a design choice. Swap these for real mentions once
 * they exist.
 */
const OUTLETS = [
  'Rome Food & Travel Weekly',
  'The Culinary Explorer',
  'City Eats Magazine',
  'Global Foodie Digest',
  'Taste of Italy Review',
  'Wanderlust Kitchen Journal',
  'The Local Table',
  'Cucina & Culture',
  "Eater's Almanac",
  'Trattoria Times',
  'The Roaming Fork',
  'Italia Uncovered',
  'Slow Food Chronicle',
  'The Piazza Post',
];

export function MediaBar() {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-[1440px] px-14">
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
          {OUTLETS.map((name) => (
            <span key={name} className="font-display text-lg text-[#8a9096] grayscale">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
