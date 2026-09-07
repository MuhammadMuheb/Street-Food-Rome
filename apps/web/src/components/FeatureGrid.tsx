const FEATURES = [
  {
    title: 'Real Places, Not Listicles',
    body: 'Every recommendation comes from a place actually eaten at — from famous market stalls to counters with no sign at all.',
  },
  {
    title: 'Small Groups, Real Access',
    body: 'Tours stay small enough to fit at a counter, walking neighbourhoods most visitors walk straight past.',
  },
  {
    title: 'Vetted, Not Just Listed',
    body: 'Every tour on this site has been personally taken, more than once, before it went on the page.',
  },
  {
    title: 'One Person to Ask',
    body: 'Questions, corrections, a place worth adding — email goes straight to the person who wrote this site.',
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Our approach</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            How this site actually works
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-line bg-paper-tint p-7">
              <h3 className="font-display text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
