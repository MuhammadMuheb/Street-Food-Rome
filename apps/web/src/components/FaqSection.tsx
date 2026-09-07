import type { PageFaq } from '@/lib/firestore';

export function FaqSection({ faqs }: { faqs: PageFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="border-t border-line bg-paper-tint">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Good to know</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Frequently asked questions</h2>

        <dl className="mt-10 divide-y divide-line-strong">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="font-display text-lg font-semibold text-ink">{faq.question}</dt>
              <dd className="mt-2 text-ink-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
