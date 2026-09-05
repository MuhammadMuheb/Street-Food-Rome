/**
 * apps/web/src/sites/streetfoodrome/components/LogoMark.tsx — the Street
 * Food Rome brand mark: a fork inside a circular badge, drawn in the site's
 * own editorial palette (tokens.ts: colorAccent #dc2626 red badge, colorBackground
 * #fffaf0 cream fork, colorPrimary #1c1917 ink ring) rather than reading CSS
 * vars — a favicon has no stylesheet to inherit from, so this stays a
 * self-contained, literally-colored asset that looks identical wherever it's
 * dropped in (header, favicon, social share image later).
 *
 * apps/web/src/app/(site)/icon.tsx redraws the same shape for the browser-tab
 * favicon — duplicated rather than shared, since that file renders through
 * Satori (next/og), a different constrained rendering engine than plain SVG.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="32" cy="32" r="31" fill="#dc2626" stroke="#1c1917" strokeWidth="2" />
      <rect x="29" y="27" width="6" height="29" rx="3" fill="#fffaf0" />
      <rect x="19" y="24" width="26" height="5" rx="2.5" fill="#fffaf0" />
      <rect x="19" y="10" width="3.4" height="16" rx="1.7" fill="#fffaf0" />
      <rect x="26.3" y="8" width="3.4" height="18" rx="1.7" fill="#fffaf0" />
      <rect x="34.3" y="8" width="3.4" height="18" rx="1.7" fill="#fffaf0" />
      <rect x="41.6" y="10" width="3.4" height="16" rx="1.7" fill="#fffaf0" />
    </svg>
  );
}
