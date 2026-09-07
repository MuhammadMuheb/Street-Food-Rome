import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllTours, getAuthor, getPageDoc, listPageDocs, SITE_DOMAIN } from '@/lib/firestore';
import { TourCard } from '@/components/TourCard';
import { FaqSection } from '@/components/FaqSection';

export const revalidate = 3600;

// Same tour -> guide-page mapping as the homepage (see that file's comment).
const TOUR_GUIDE_HREF: Record<string, string> = {
  'trastevere-food-wine-walk': '/trastevere-food-tour',
  'testaccio-market-food-tour': '/testaccio-market-tour',
  'rome-food-wine-tasting': '/rome-food-wine-tour',
  'aperitivo-evening-experience': '/aperitivo-evening-tour',
};

export async function generateStaticParams() {
  const pages = await listPageDocs();
  return pages.filter((p) => p.slug !== 'home').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageDoc(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDesc,
      images: page.heroImageUrl ? [page.heroImageUrl] : undefined,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageDoc(slug);
  if (!page) notFound();

  const [author, allTours] = await Promise.all([
    page.authorId ? getAuthor(page.authorId) : Promise.resolve(null),
    page.featuredTourSlugs.length > 0 ? getAllTours() : Promise.resolve([]),
  ]);

  const featuredTours = allTours.filter((t) => page.featuredTourSlugs.includes(t.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: page.title, item: `https://${SITE_DOMAIN}/${slug}` },
        ],
      },
      page.faqs.length > 0
        ? {
            '@type': 'FAQPage',
            mainEntity: page.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }
        : null,
    ].filter(Boolean),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD requires raw <script> content; escaped below to prevent breaking out of the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {page.heroImageUrl ? (
        <div className="relative h-[360px] w-full sm:h-[440px]">
          <Image
            src={page.heroImageUrl}
            alt={page.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <h1 className="mx-auto w-full max-w-3xl px-6 pb-12 font-display text-3xl font-semibold text-paper sm:text-5xl">
              {page.title}
            </h1>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-6 pt-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-5xl">{page.title}</h1>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16">
        <div
          className="space-y-6 text-lg leading-relaxed text-ink-muted"
          // eslint-disable-next-line react/no-danger -- bodyHtml is authored/edited directly in the Firebase Console, not user input.
          dangerouslySetInnerHTML={{ __html: page.bodyHtml ?? '' }}
        />

        {author ? (
          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-line bg-paper-tint p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-display text-lg font-semibold text-paper">
              {author.name.charAt(0)}
            </span>
            <div>
              <p className="font-display text-base font-semibold text-ink">{author.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{author.bio}</p>
            </div>
          </div>
        ) : null}
      </div>

      {featuredTours.length > 0 ? (
        <section className="border-t border-line bg-paper-tint">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-display text-2xl font-semibold text-ink">Book this tour</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} guideHref={TOUR_GUIDE_HREF[tour.slug] ?? `/${slug}`} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FaqSection faqs={page.faqs} />
    </article>
  );
}
