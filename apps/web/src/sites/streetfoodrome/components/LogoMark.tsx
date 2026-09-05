/**
 * apps/web/src/sites/streetfoodrome/components/LogoMark.tsx — the Street
 * Food Rome brand mark: a standalone geometric column glyph (capital,
 * three fluted bars, base) paired with a bold two-tier wordmark. A column's
 * fluting and a fork's tines share the same visual grammar, so one shape
 * carries both the "Roman" and the "food" half of the brand without
 * resorting to a literal map-pin or cutlery icon.
 *
 * Strictly monochrome by design — no accent color anywhere in the mark, in
 * either variant. `variant="light"` is ink-on-white (for a light-theme
 * surface); `variant="dark"` is the same glyph in reverse, off-white ink,
 * for a dark-theme surface. Header.tsx never renders this directly; the
 * caller (this site's own nav config in ../index.tsx) renders both variants
 * and lets Tailwind's `dark:` classes decide which one is visible, so the
 * swap is pure CSS — no client JS, no hydration flicker.
 *
 * Colors are literal, not CSS vars — a favicon has no stylesheet to inherit
 * from, so this stays identical wherever it's dropped in. Typography is
 * Fraunces, loaded site-wide via the Google Fonts stylesheet in
 * (site)/layout.tsx (not next/font here) — every heading now uses the same
 * face (see streetfoodrome/tokens.ts's `fontHeading`), and the literal font
 * name is what lets this SVG's `fontFamily` attribute and every CSS
 * `font-heading` class agree on the same font without separate loading.
 */
const FRAUNCES = "Fraunces, Georgia, serif";

export type LogoVariant = 'light' | 'dark';

export function LogoMark({ height = 40, variant = 'light' }: { height?: number; variant?: LogoVariant }) {
  const width = Math.round(height * (210 / 48));
  const ink = variant === 'dark' ? '#fafaf9' : '#0a0a0a';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 210 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Street Food Rome"
      className="shrink-0"
    >
      {/* Column glyph — capital, three fluted bars (also read as fork
          tines), base. No frame, no pin, no cutout — just the shape. */}
      <rect x="2" y="4" width="28" height="4" rx="1" fill={ink} />
      <rect x="6" y="10" width="4" height="24" rx="1.5" fill={ink} />
      <rect x="14" y="8" width="4" height="26" rx="1.5" fill={ink} />
      <rect x="22" y="10" width="4" height="24" rx="1.5" fill={ink} />
      <rect x="2" y="36" width="28" height="4" rx="1" fill={ink} />

      {/* Wordmark — quiet tracked kicker over the bold masthead word, both
          the same ink color as the glyph. No accent color in the mark. */}
      <text
        x="46"
        y="19"
        fontFamily={FRAUNCES}
        fontSize="10"
        fontWeight="600"
        letterSpacing="3.2"
        fill={ink}
      >
        STREET FOOD
      </text>
      <text
        x="45"
        y="43"
        fontFamily={FRAUNCES}
        fontSize="29"
        fontWeight="900"
        letterSpacing="0.5"
        fill={ink}
      >
        ROME
      </text>
    </svg>
  );
}
