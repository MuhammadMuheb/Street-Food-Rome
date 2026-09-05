'use client';

/**
 * apps/web/src/sites/streetfoodrome/components/FoodMatchQuiz.tsx — "What's
 * Your Rome Street Food Match?": a 4-question quiz that recommends one of
 * the site's real tours (passed in as `tours`, already the same
 * `TourCardData[]` shape every other block on this site uses — no separate
 * data-fetching path for this feature).
 *
 * Visual/interactive direction taken from the Burgos Street Food theme this
 * feature was requested to riff on: a bold warm gradient (its own
 * demo palette runs orange-to-gold; ROME_GRADIENT below extends that same
 * energy from this site's existing red accent instead of introducing an
 * unrelated color), and a big "menu tile" reveal card (headline + price tag)
 * echoing that theme's `[burgos_homefullbox]` pattern.
 *
 * Plain useState + CSS keyframes (globals.css's .animate-fade-slide-in) —
 * deliberately no animation library, so this stays a small, cheap client
 * island rather than a bundle-size regression.
 */
import { useState } from 'react';
import type { TourCardData } from '@italy-tours/ui';

export const ROME_GRADIENT = 'linear-gradient(135deg, #dc2626 0%, #f97316 55%, #fbbf24 100%)';

type TourProfile = 'trastevere-food-wine-walk' | 'testaccio-market-food-tour' | 'rome-food-wine-tasting' | 'aperitivo-evening-experience';

interface QuizOption {
  label: string;
  emoji: string;
  profile: TourProfile;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: 'How much time do you have?',
    options: [
      { label: 'About 2 hours — quick and easy', emoji: '⏱️', profile: 'aperitivo-evening-experience' },
      { label: "3–4 hours — I want the full experience", emoji: '🍽️', profile: 'trastevere-food-wine-walk' },
      { label: "I've got all evening", emoji: '🌙', profile: 'rome-food-wine-tasting' },
    ],
  },
  {
    question: 'What sounds better right now?',
    options: [
      { label: 'Wandering a real market, tasting as I go', emoji: '🧺', profile: 'testaccio-market-food-tour' },
      { label: 'Sitting down for wine + proper pairings', emoji: '🍷', profile: 'rome-food-wine-tasting' },
      { label: 'Small bites, neighbourhood to neighbourhood', emoji: '🚶', profile: 'trastevere-food-wine-walk' },
      { label: 'Drinks and small plates as the sun goes down', emoji: '🌇', profile: 'aperitivo-evening-experience' },
    ],
  },
  {
    question: 'Pick a vibe.',
    options: [
      { label: 'Classic trattoria comfort', emoji: '🍝', profile: 'trastevere-food-wine-walk' },
      { label: 'Local market energy', emoji: '📣', profile: 'testaccio-market-food-tour' },
      { label: 'Golden hour and good company', emoji: '🥂', profile: 'aperitivo-evening-experience' },
      { label: 'Wine-forward and unhurried', emoji: '🍇', profile: 'rome-food-wine-tasting' },
    ],
  },
  {
    question: "Who's coming?",
    options: [
      { label: 'Just me, exploring solo', emoji: '🎒', profile: 'testaccio-market-food-tour' },
      { label: 'A date night', emoji: '❤️', profile: 'aperitivo-evening-experience' },
      { label: 'Friends who love wine', emoji: '👯', profile: 'rome-food-wine-tasting' },
      { label: 'Anyone up for a good walk and good food', emoji: '👣', profile: 'trastevere-food-wine-walk' },
    ],
  },
];

// Tie-break order when two profiles tie on votes — the flagship tour wins.
const PRIORITY: TourProfile[] = ['trastevere-food-wine-walk', 'testaccio-market-food-tour', 'rome-food-wine-tasting', 'aperitivo-evening-experience'];

function tallyWinner(votes: TourProfile[]): TourProfile {
  const counts = new Map<TourProfile, number>();
  for (const vote of votes) counts.set(vote, (counts.get(vote) ?? 0) + 1);

  let winner: TourProfile = 'trastevere-food-wine-walk';
  let best = -1;
  for (const profile of PRIORITY) {
    const count = counts.get(profile) ?? 0;
    if (count > best) {
      best = count;
      winner = profile;
    }
  }
  return winner;
}

function tourSlugFromHref(href: string): string {
  return href.split('/go/')[1] ?? '';
}

export function FoodMatchQuiz({ tours }: { tours: TourCardData[] }) {
  const [step, setStep] = useState(0);
  const [votes, setVotes] = useState<TourProfile[]>([]);

  const isResult = step >= QUESTIONS.length;
  const currentQuestion = QUESTIONS[step];
  const winnerSlug = isResult ? tallyWinner(votes) : null;
  const matchedTour = winnerSlug ? tours.find((tour) => tourSlugFromHref(tour.href) === winnerSlug) : null;

  function choose(option: QuizOption) {
    setVotes((prev) => [...prev, option.profile]);
    setStep((prev) => prev + 1);
  }

  function playAgain() {
    setVotes([]);
    setStep(0);
  }

  return (
    <div className="overflow-hidden rounded-site border border-foreground/10 bg-background">
      {!isResult && currentQuestion ? (
        <div key={step} className="animate-fade-slide-in p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%`, background: ROME_GRADIENT }}
              />
            </div>
            <span className="whitespace-nowrap text-xs font-medium text-foreground/60">
              {step + 1} / {QUESTIONS.length}
            </span>
          </div>

          <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">{currentQuestion.question}</h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => choose(option)}
                className="flex items-center gap-3 rounded-site border border-foreground/10 bg-background px-4 py-3.5 text-left transition-colors hover:border-transparent hover:bg-foreground/5"
              >
                <span aria-hidden className="text-xl">
                  {option.emoji}
                </span>
                <span className="text-sm font-medium text-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : matchedTour ? (
        <div className="animate-fade-slide-in">
          <div className="p-6 text-center text-background sm:p-8" style={{ background: ROME_GRADIENT }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-90">Your match</p>
            <h3 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">{matchedTour.title}</h3>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm font-medium opacity-95">
              {matchedTour.priceBand ? <span>{matchedTour.priceBand}</span> : null}
              {matchedTour.duration ? <span>&middot; {matchedTour.duration}</span> : null}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 sm:p-8">
            <a
              href={matchedTour.href}
              className="w-full rounded-site px-5 py-3 text-center font-medium text-background transition-opacity hover:opacity-90 sm:w-auto sm:px-8"
              style={{ background: ROME_GRADIENT }}
            >
              Reserve your spot
            </a>
            <button type="button" onClick={playAgain} className="text-sm font-medium text-foreground/60 hover:text-foreground">
              Play again
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-foreground/60">Couldn&apos;t find a match this time.</div>
      )}
    </div>
  );
}
