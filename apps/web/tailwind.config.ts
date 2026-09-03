import type { Config } from 'tailwindcss';

/**
 * Per-site theming works through CSS custom properties (see src/app/layout.tsx),
 * which the middleware stamps per request from `Site.themeTokens`. Tailwind's
 * color/font/radius scales here are thin wrappers around those vars, so both
 * `packages/ui` primitives and `packages/templates` blocks stay site-agnostic.
 */
const config: Config = {
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
        background: 'var(--colorBackground)',
        foreground: 'var(--colorForeground)',
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
