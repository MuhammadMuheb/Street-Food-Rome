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
];

export function MediaBar() {
  return (
    <section className="border-b border-[#e8ebed] bg-white py-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
          Read by Rome food lovers, planners, and fellow food writers
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
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
