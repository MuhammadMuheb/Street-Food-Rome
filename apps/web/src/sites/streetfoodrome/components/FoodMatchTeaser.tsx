/**
 * apps/web/src/sites/streetfoodrome/components/FoodMatchTeaser.tsx — homepage
 * banner inviting visitors into the /food-match quiz. Plain server component
 * (no client JS) — the quiz itself only loads its interactive code on the
 * /food-match route, so this teaser costs nothing extra on every other page.
 */
import Link from 'next/link';
import { Container } from '@italy-tours/ui';
import { ROME_GRADIENT } from './FoodMatchQuiz';

export function FoodMatchTeaser() {
  return (
    <Container className="py-8">
      <Link
        href="/food-match"
        className="group flex flex-col items-start gap-4 overflow-hidden rounded-site p-6 text-inverse transition-transform hover:scale-[1.01] sm:flex-row sm:items-center sm:justify-between sm:p-8"
        style={{ background: ROME_GRADIENT }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-90">60-second quiz</p>
          <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">What&apos;s Your Rome Street Food Match?</h2>
          <p className="mt-2 max-w-md text-sm opacity-95">
            Answer four quick questions and we&apos;ll match you with the tour that actually fits your evening.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-site bg-background px-6 py-3 font-medium text-foreground transition-transform group-hover:translate-x-1">
          Find my match
          <span aria-hidden>&rarr;</span>
        </span>
      </Link>
    </Container>
  );
}
