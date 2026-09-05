/**
 * apps/web/src/sites/streetfoodrome/index.tsx — streetfoodrome.com's entry
 * point, dynamically imported by apps/web/src/site-resolver/renderDispatch.tsx
 * when `Site.type === 'hero'` and `Site.slug === 'streetfoodrome'`.
 *
 * Not template-built (blueprint §5.2): switches on slug/pageType itself
 * rather than delegating to packages/templates/src/registry.ts.
 */
import type { HeroNavConfig } from '@/site-resolver/renderDispatch';
import { HomeLayout } from './layouts/HomeLayout';
import { MoneyPageLayout } from './layouts/MoneyPageLayout';
import { SupportPageLayout } from './layouts/SupportPageLayout';
import { InstagramOfferLayout } from './layouts/InstagramOfferLayout';
import { FoodMatchLayout } from './layouts/FoodMatchLayout';
import { LogoMark } from './components/LogoMark';
import type { StreetFoodRomePageProps } from './types';

export const nav: HeroNavConfig = {
  siteName: 'Street Food Rome',
  // Both logo variants render; Tailwind's `dark:` classes pick which one is
  // visible, so the swap happens in CSS the instant `.dark` toggles — no
  // client JS deciding which logo to render, no hydration flicker.
  logo: (
    <>
      <span className="dark:hidden">
        <LogoMark height={40} variant="light" />
      </span>
      <span className="hidden dark:inline-flex">
        <LogoMark height={40} variant="dark" />
      </span>
    </>
  ),
  showThemeToggle: true,
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Food Tours', href: '/rome-street-food-tour' },
    { label: 'Food Match', href: '/food-match' },
    { label: 'Market Guide', href: '/rome-market-guide' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function StreetFoodRomeSite(props: StreetFoodRomePageProps) {
  if (props.slug === 'home') {
    return <HomeLayout {...props} />;
  }
  // Instagram bio-link landing page and the Food Match quiz both get their
  // own layout regardless of pageType, same reasoning as 'home' above.
  if (props.slug === 'instagram') {
    return <InstagramOfferLayout {...props} />;
  }
  if (props.slug === 'food-match') {
    return <FoodMatchLayout {...props} />;
  }
  if (props.pageType === 'money') {
    return <MoneyPageLayout {...props} />;
  }
  return <SupportPageLayout {...props} />;
}
