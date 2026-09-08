/**
 * Deliberately generic, representative publication-style names — not real
 * outlets. Street Food Rome hasn't actually been featured by any press yet,
 * so naming real, identifiable news organizations here would be a false
 * endorsement claim, not a design choice. Swap these for real mentions once
 * they exist.
 */
const OUTLETS = [
  'Rome Food Weekly',
  'The Culinary Explorer',
  'City Eats Magazine',
  'Global Foodie Digest',
  'Taste of Italy Review',
  'Wanderlust Kitchen',
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
    <section className="border-t border-[#eef0f1] bg-white py-12">
      <div className="mx-auto max-w-[1440px] px-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#b3b8bc]">
          Read by Rome food lovers, planners &amp; fellow food writers
        </p>

        {/* Fixed 7-column grid — 14 items always wraps to exactly 2 rows,
            regardless of viewport width or each name's text length. */}
        <div className="mx-auto mt-7 grid max-w-[1280px] grid-cols-7 items-center justify-items-center gap-x-8 gap-y-5">
          {OUTLETS.map((name) => (
            <span
              key={name}
              className="whitespace-nowrap font-sans text-sm font-medium tracking-wide text-[#9aa0a5] grayscale transition-colors hover:text-[#6b7075]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
