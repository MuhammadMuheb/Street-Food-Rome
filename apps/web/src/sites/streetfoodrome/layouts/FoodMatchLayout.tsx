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
    <div className="bg-tint py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-5 before:bg-accent after:block after:h-px after:w-5 after:bg-accent">
            Street Food Rome
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">{page.title}</h1>
          {page.bodyHtml ? (
            <div
              className="mt-4 text-foreground/70"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
            />
          ) : null}
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <FoodMatchQuiz tours={page.tours} />
        </div>
      </Container>
    </div>
  );
}
