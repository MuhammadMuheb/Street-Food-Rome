/**
 * packages/ui/src/blocks/FAQ.tsx — renders a Page's quotable FAQ array
 * (Pages.faqs). Visible markup carries its own heading (defaults to
 * "Frequently asked questions") — the FAQPage JSON-LD carrying the same
 * content lives in packages/seo, but this section shouldn't be the one
 * unlabeled block on an otherwise well-labeled page.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  heading?: string;
}

export function FAQ({ items, heading = 'Frequently asked questions' }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-5 before:bg-accent">
        Good to know
      </p>
      <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">{heading}</h2>
      <dl className="mt-8 flex flex-col">
        {items.map((item) => (
          <div key={item.question} className="border-t border-foreground/10 py-6 last:border-b">
            <dt className="font-heading text-lg font-semibold italic text-foreground">{item.question}</dt>
            <dd className="mt-2 max-w-2xl text-foreground/70">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
