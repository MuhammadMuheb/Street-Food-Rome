import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { UCAuthorBox, UCFooter, UCHeader } from './UCShared';
import type { SupportPageContent } from '@/lib/underground-colosseum-content';

/**
 * Shared template for all 6 support pages (per the site blueprint's §07
 * "Support page" spec: FAQPage + BreadcrumbList schema, first-hand detail,
 * one primary CTA into the money page it feeds, one contextual link, FAQ).
 * Content is entirely data-driven (lib/underground-colosseum-content.ts).
 */
export function SupportPageTemplate({ content }: { content: SupportPageContent }) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://undergroundcolosseum.com/' },
      { '@type': 'ListItem', position: 2, name: content.navTitle, item: `https://undergroundcolosseum.com${content.href}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <UCHeader toursHref="/#tours" planHref="/#plan-your-visit" faqHref="#faq" ctaHref={`${content.relatedMoneyHref}#tour-options`} />

      {/* ---------- hero ---------- */}
      <section className="border-b border-[#e8ebed]">
        <div className="mx-auto max-w-[1200px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[#9aa0a5]">
            <Link href="/" className="hover:text-[#ff0022]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5c6166]">{content.navTitle}</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-8 sm:px-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff0022]">{content.keyword}</p>
            <h1 className="mt-3 font-sans text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-[42px]">
              {content.h1}
            </h1>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={content.relatedMoneyHref}
                className="flex h-11 items-center justify-center rounded-[6px] bg-[#ff0022] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e0001d]"
              >
                {content.relatedMoneyLabel}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f4f4f4]">
            <SafeImage src={content.heroImage.src} alt={content.heroImage.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ---------- body sections ---------- */}
      <section className="border-b border-[#e8ebed] py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          {content.sections.map((section) => (
            <div key={section.heading} className="mt-8 first:mt-0">
              <h2 className="font-sans text-[22px] font-extrabold leading-snug tracking-tight text-[#1a1a1a] sm:text-[26px]">
                {section.heading}
              </h2>
              {section.body.map((para, i) => (
                <p key={i} className="mt-3 text-[15.5px] leading-relaxed text-[#5c6166]">
                  {para}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-10 rounded-2xl border border-[#e8ebed] bg-[#f9fafa] p-6">
            <h3 className="font-sans text-[17px] font-bold text-[#1a1a1a]">Ready to book?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#5c6166]">
              This page feeds directly into our comparison of every tour that covers this — see the full breakdown.
            </p>
            <Link
              href={content.relatedMoneyHref}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-[6px] bg-[#ff0022] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e0001d]"
            >
              {content.relatedMoneyLabel} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-[65px] border-b border-[#e8ebed] bg-[#f9fafa] py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <h2 className="font-sans text-[26px] font-extrabold leading-snug tracking-tight text-[#1a1a1a] sm:text-[32px]">
            Frequently Asked
          </h2>
          <div className="mt-6 divide-y divide-[#e8ebed] rounded-2xl border border-[#e8ebed] bg-white">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-[#1a1a1a] marker:content-none">
                  {faq.question}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-[#9aa0a5] transition-transform group-open:rotate-180">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#5c6166]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <UCAuthorBox />
      <UCFooter />
    </div>
  );
}
