/**
 * packages/ui/src/blocks/FAQ.tsx — renders a Page's quotable FAQ array
 * (Pages.faqs). Visible markup here is intentionally plain and quotable —
 * the FAQPage JSON-LD carrying the same content lives in packages/seo.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <dl className="flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.question}>
          <dt className="font-heading font-semibold text-foreground">{item.question}</dt>
          <dd className="mt-1 text-foreground/80">{item.answer}</dd>
        </div>
      ))}
    </dl>
  );
}
