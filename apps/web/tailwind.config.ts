import type { Config } from 'tailwindcss';

/**
 * Per-site theming works through CSS custom properties (see src/app/layout.tsx),
 * which the middleware stamps per request from `Site.themeTokens`. Tailwind's
 * color/font/radius scales here are thin wrappers around those vars, so both
 * `packages/ui` primitives and `packages/templates` blocks stay site-agnostic.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/sites/**/*.{ts,tsx}',
    './src/site-resolver/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/templates/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--colorPrimary)',
        accent: 'var(--colorAccent)',
        // background/foreground resolve through --bg/--fg, not
        // --colorBackground/--colorForeground directly — see the comment
        // above :root in globals.css for why that indirection is required
        // for the `.dark` class toggle to be able to override them at all.
        background: 'var(--bg)',
        foreground: 'var(--fg)',
        // A fixed light color for text on an always-colored/always-dark
        // surface (hero overlays, accent CTAs) — never flips with the mode.
        inverse: 'var(--colorInverse)',
        // Alternate section background for visual rhythm (Section's `tint`
        // prop) — a deliberate step away from `background`, not a duplicate.
        tint: 'var(--surface-tint)',
      },
      fontFamily: {
        heading: 'var(--fontHeading)',
        body: 'var(--fontBody)',
      },
      borderRadius: {
        site: 'var(--radius)',
      },
    },
  },
  plugins: [],
};

export default config;
