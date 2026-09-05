/**
 * packages/ui/src/blocks/PullQuote.tsx — an oversized, italic editorial
 * quote with attribution — replaces a plain bordered blockquote wherever a
 * page needs to foreground one first-hand line (e.g. streetfoodrome's
 * VerdictBlock) as the visual centerpiece of its section, not a footnote.
 */
export interface PullQuoteProps {
  quote: string;
  attribution?: string;
}

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span aria-hidden className="font-heading text-6xl leading-none text-accent/80">
        &ldquo;
      </span>
      <blockquote className="mt-2 font-heading text-2xl font-medium italic leading-snug text-foreground sm:text-[2rem]">
        {quote}
      </blockquote>
      {attribution ? (
        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.08em] text-foreground/50">{attribution}</p>
      ) : null}
    </div>
  );
}
