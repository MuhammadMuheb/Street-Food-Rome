import Link from '@/components/NetworkLink';
import { UCFooter, UCHeader } from './UCShared';

/**
 * Contact page — per the blueprint's §07 spec: a contact method plus the
 * affiliate disclosure statement covering all three partner programs. A
 * mailto link rather than a submission form, since there's no backend here
 * to actually receive form submissions — a form that silently goes nowhere
 * would be worse than an honest mailto.
 */
export function UCContactPage() {
  return (
    <div className="bg-white">
      <UCHeader toursHref="/#tours" planHref="/#plan-your-visit" faqHref="/#faq" ctaHref="/#featured-tours" />

      <section className="border-b border-[#e8ebed]">
        <div className="mx-auto max-w-[1200px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[#9aa0a5]">
            <Link href="/" className="hover:text-[#ff0022]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5c6166]">Contact</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[760px] px-6 py-10 sm:px-14 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff0022]">Get in touch</p>
          <h1 className="mt-3 font-sans text-[36px] font-extrabold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-[46px]">
            Contact
          </h1>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-[#5c6166]">
            Spotted something out of date, or have a question about a tour we compare? Email us directly — we read
            every message ourselves.
          </p>

          <a
            href="mailto:hello@undergroundcolosseum.com"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-[6px] bg-[#ff0022] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e0001d]"
          >
            hello@undergroundcolosseum.com
          </a>

          <div id="disclosure" className="mt-12 scroll-mt-[85px] rounded-2xl border border-[#e8ebed] bg-[#f9fafa] p-6">
            <h2 className="font-sans text-[18px] font-bold text-[#1a1a1a]">Affiliate Disclosure</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5c6166]">
              Underground Colosseum participates in affiliate programs with GetYourGuide, Viator, and Tiqets. When
              you book a tour through an outbound link on this site, we may earn a commission at no extra cost to
              you. This site independently compares tours across all three platforms and does not accept payment
              for placement — a tour appearing higher on a comparison reflects our own editorial judgment, not a
              sponsorship arrangement.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="flex h-11 items-center justify-center rounded-[6px] border border-[#ff0022] px-6 text-sm font-medium text-[#ff0022] transition-colors hover:bg-[rgba(237,56,54,0.08)]"
            >
              About This Site
            </Link>
            <Link
              href="/underground-arena-floor-tour"
              className="flex h-11 items-center justify-center rounded-[6px] bg-[#ff0022] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e0001d]"
            >
              Compare Underground Tours
            </Link>
          </div>
        </div>
      </section>

      <UCFooter />
    </div>
  );
}
