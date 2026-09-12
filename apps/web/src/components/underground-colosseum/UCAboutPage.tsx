import Link from '@/components/NetworkLink';
import { UCFooter, UCHeader } from './UCShared';
import { AUTHOR } from '@/lib/underground-colosseum';

/**
 * The site's About page — per the blueprint's §07 spec: author bio and
 * credentials, plus the non-affiliation disclosure that backs up every
 * "independent, no operator affiliation" claim made across the homepage
 * and money pages.
 */
export function UCAboutPage() {
  return (
    <div className="bg-white">
      <UCHeader toursHref="/#tours" planHref="/#plan-your-visit" faqHref="/#faq" ctaHref="/#featured-tours" />

      <section className="border-b border-[#e8ebed]">
        <div className="mx-auto max-w-[1200px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[#9aa0a5]">
            <Link href="/" className="hover:text-[#ff0022]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5c6166]">About</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[760px] px-6 py-10 sm:px-14 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff0022]">About this site</p>
          <h1 className="mt-3 font-sans text-[36px] font-extrabold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-[46px]">
            Written by someone who has actually walked every underground circuit
          </h1>

          <div className="mt-8 flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff3344] to-[#b8001c] text-xl font-bold text-white shadow-sm">
              {AUTHOR.initials}
            </div>
            <div>
              <p className="text-[18px] font-bold text-[#1a1a1a]">{AUTHOR.name}</p>
              <p className="text-sm font-medium text-[#9aa0a5]">
                {AUTHOR.title} &middot; {AUTHOR.domain}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-[15.5px] leading-relaxed text-[#5c6166]">
            <p>
              Underground Colosseum exists because most guides to the Colosseum&rsquo;s underground and arena-floor
              tours are written by whoever sells the tour, not by someone who has actually compared what each
              operator delivers. Every comparison, ticket breakdown, and practical tip on this site comes from
              walking the routes in person and cross-checking what different operators (GetYourGuide, Viator,
              Tiqets) actually include against each other, rather than repeating marketing copy.
            </p>
            <p>
              This site is independent. We are not owned by, and do not receive preferential payment from, any
              single tour operator or ticketing platform — we link to whichever option is genuinely the best fit for
              a given situation, and we say plainly when the underground add-on isn&rsquo;t worth the extra cost.
            </p>
            <p>
              Where this site does earn money: some outbound links to tour and ticket providers are affiliate links,
              meaning we may earn a small commission if you book through them, at no extra cost to you. This never
              changes which option we recommend first — see our{' '}
              <Link href="/contact#disclosure" className="font-semibold text-[#ff0022] hover:underline">
                affiliate disclosure
              </Link>{' '}
              for the full detail.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/underground-arena-floor-tour"
              className="flex h-11 items-center justify-center rounded-[6px] bg-[#ff0022] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e0001d]"
            >
              Compare Underground Tours
            </Link>
            <Link
              href="/contact"
              className="flex h-11 items-center justify-center rounded-[6px] border border-[#ff0022] px-6 text-sm font-medium text-[#ff0022] transition-colors hover:bg-[rgba(237,56,54,0.08)]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <UCFooter />
    </div>
  );
}
