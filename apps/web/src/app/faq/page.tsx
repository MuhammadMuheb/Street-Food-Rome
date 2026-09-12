import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('faq');
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/faq` },
  };
}

export default async function FaqPage() {
  const page = await getPageDoc('faq');
  if (!page) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <InnerHero
        title={page.title}
        subtitle="Booking, cancellations, and what this site actually covers."
        breadcrumb={{ label: 'Home', href: '/' }}
      />

      <section className="py-14">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <div className="divide-y divide-[#e8ebed] rounded-2xl border border-[#e8ebed]">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-[#1a1a1a] marker:content-none">
                  {faq.question}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-[#9aa0a5] transition-transform group-open:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#5c6166]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
