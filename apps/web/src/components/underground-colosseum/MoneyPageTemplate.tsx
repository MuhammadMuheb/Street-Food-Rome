import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { UCAuthorBox, UCFooter, UCHeader } from './UCShared';
import { FEATURED_TOURS } from '@/lib/underground-colosseum';
import type { MoneyPageContent } from '@/lib/underground-colosseum-content';

/**
 * Shared template for all 5 money pages (per the site blueprint's §07 "Money
 * page" spec: TouristAttraction + Product/Offer + FAQPage + BreadcrumbList
 * schema, tour-comparison cards, a verdict block, FAQ, one contextual link).
 * Content is entirely data-driven (lib/underground-colosseum-content.ts) so
 * every page gets the same structure and polish without 5 bespoke files.
 */
export function MoneyPageTemplate({ content }: { content: MoneyPageContent }) {
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

  const attractionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Colosseum',
    description: content.metaDescription,
    url: `https://undergroundcolosseum.com${content.href}`,
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionJsonLd) }} />

      <UCHeader toursHref="/#tours" planHref="/#plan-your-visit" faqHref="#faq" ctaHref="#tour-options" />

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
            {content.intro.map((para, i) => (
              <p key={i} className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-[#5c6166]">
                {para}
              </p>
            ))}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#tour-options"
                className="flex h-11 items-center justify-center rounded-[6px] bg-[#ff0022] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e0001d]"
              >
                See Tour Options
              </a>
              <Link
                href={content.relatedSupportHref}
                className="flex h-11 items-center justify-center rounded-[6px] border border-[#ff0022] px-6 text-sm font-medium text-[#ff0022] transition-colors hover:bg-[rgba(237,56,54,0.08)]"
              >
                {content.relatedSupportLabel}
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

          <div className="mt-10 rounded-2xl border border-[#dcac86] bg-[rgba(184,134,46,0.06)] p-6">
            <h3 className="font-sans text-[17px] font-bold text-[#1a1a1a]">{content.verdict.heading}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#5c6166]">{content.verdict.body}</p>
          </div>
        </div>
      </section>

      {/* ---------- tour comparison cards ---------- */}
      <section id="tour-options" className="scroll-mt-[65px] border-b border-[#e8ebed] bg-[#f9fafa] py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff0022]">Live tour comparison</p>
          <h2 className="mt-2 font-sans text-[26px] font-extrabold leading-snug tracking-tight text-[#1a1a1a] sm:text-[32px]">
            Every Tour Option, Compared
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_TOURS.map((tour) => (
              <div key={tour.slug} className="flex flex-col overflow-hidden rounded-2xl border border-[#e8ebed] bg-white">
                <div className="relative aspect-[4/3] bg-[#f4f4f4]">
                  <SafeImage src={tour.image.src} alt={tour.image.alt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="w-fit rounded-full bg-[#f4f4f4] px-2.5 py-1 text-xs font-semibold text-[#5c6166]">{tour.partner}</span>
                  <h3 className="mt-3 font-sans text-[16px] font-bold leading-snug text-[#1a1a1a]">{tour.title}</h3>
                  <p className="mt-1.5 text-sm text-[#5c6166]">{tour.meta}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="font-sans text-xl font-bold text-[#1a1a1a]">from &euro;{tour.priceFrom}</span>
                    <Link href={`/go/${tour.slug}`} className="text-sm font-bold text-[#ff0022] hover:underline">
                      View tour &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-[65px] border-b border-[#e8ebed] py-14 sm:py-16">
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
