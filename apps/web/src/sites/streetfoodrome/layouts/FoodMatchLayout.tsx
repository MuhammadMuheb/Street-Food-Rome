/**
 * apps/web/src/sites/streetfoodrome/layouts/FoodMatchLayout.tsx — the
 * "What's Your Rome Street Food Match?" quiz page. `page.tours` is expected
 * to carry all four bookable tours (seeded as this Page's featuredTours —
 * see cms/src/seed/seedFoodMatchPage.ts) so FoodMatchQuiz can match a quiz
 * result against real, cloaked tour links without a separate data fetch.
 */
import { Container } from '@italy-tours/ui';
import { FoodMatchQuiz } from '../components/FoodMatchQuiz';
import type { StreetFoodRomePageProps } from '../types';

export function FoodMatchLayout({ page }: StreetFoodRomePageProps) {
  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Street Food Rome</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">{page.title}</h1>
        {page.bodyHtml ? (
          // eslint-disable-next-line react/no-danger
          <div className="mt-3 text-foreground/70" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        ) : null}
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <FoodMatchQuiz tours={page.tours} />
      </div>
    </Container>
  );
}
