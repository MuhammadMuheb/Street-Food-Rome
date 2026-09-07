const POINTS = [
  {
    label: 'Every Place, Personally Eaten',
    body: 'Nothing recommended unless it’s been eaten first-hand, usually more than once.',
    icon: (
      <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    ),
  },
  {
    label: 'No Pay-for-Placement',
    body: 'No restaurant, stall, or tour operator has ever paid to be featured here.',
    icon: (
      <>
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 11h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    label: 'Small, Real Neighbourhoods',
    body: 'Tours stay two streets back from the crowds, where Rome actually eats.',
    icon: (
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'Written by One Person',
    body: 'Not a content team — one resident’s notes, kept current by actually eating here.',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
];

export function TrustBar() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
          Why trust Street Food Rome?
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point) => (
            <div key={point.label} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {point.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{point.label}</h3>
              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-ink-muted">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
