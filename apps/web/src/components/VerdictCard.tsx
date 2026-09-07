import Link from 'next/link';

interface VerdictCardProps {
  neighbourhood: string;
  quote: string;
  href: string;
}

export function VerdictCard({ neighbourhood, quote, href }: VerdictCardProps) {
  return (
    <div className="w-[320px] shrink-0 snap-start rounded-2xl border border-line bg-paper p-6">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        {neighbourhood}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink">&ldquo;{quote}&rdquo;</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-ink-muted">Marco Ferretti, Street Food Rome</span>
        <Link href={href} className="text-xs font-semibold text-accent hover:text-accent-hover">
          See the tour →
        </Link>
      </div>
    </div>
  );
}
