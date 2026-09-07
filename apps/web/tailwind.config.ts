import type { Config } from 'tailwindcss';

function withOpacity(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: withOpacity('--paper'),
        'paper-tint': withOpacity('--paper-tint'),
        ink: withOpacity('--ink'),
        'ink-muted': withOpacity('--ink-muted'),
        accent: withOpacity('--accent'),
        'accent-hover': withOpacity('--accent-hover'),
        gold: withOpacity('--gold'),
        line: withOpacity('--line'),
        'line-strong': withOpacity('--line-strong'),
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-public-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
