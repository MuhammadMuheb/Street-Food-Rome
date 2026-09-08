const POINTS = [
  {
    label: 'Trusted Rome Food Guide',
    body: 'Real recommendations from a 12-year Rome resident, not a crowd-sourced algorithm.',
    icon: (
      <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Curated Rome Food Walks',
    body: 'Every tour personally taken — small groups, real neighbourhoods, no tourist traps.',
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: 'Flexible Booking',
    body: 'Free cancellation and easy rescheduling on every Rome food tour we recommend.',
    icon: (
      <>
        <path
          d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 8v8" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 2" />
      </>
    ),
  },
  {
    label: 'Local, Direct Support',
    body: 'Email goes straight to the person who wrote this site — real answers, not a call centre.',
    icon: (
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
];

export function TrustBar() {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-[1440px] px-14">
        <h2 className="text-center text-[30px] font-extrabold text-[#3b3e3f]">
          Why Book Rome Food Tours With Us?
        </h2>

        <div className="mx-auto mt-6 grid max-w-[1312px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[316px_316px_316px_316px]">
          {POINTS.map((point) => (
            <div key={point.label} className="flex items-start gap-4">
              <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[rgba(237,56,54,0.12)] text-[rgb(197,48,48)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {point.icon}
                </svg>
              </span>
              <div>
                <h3 className="text-xl font-bold text-[rgb(30,30,30)]">{point.label}</h3>
                <p className="text-base leading-[26px] text-[rgb(117,124,127)]">{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
