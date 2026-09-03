/**
 * apps/web/src/sites/streetfoodrome/index.tsx — streetfoodrome.com's entry
 * point, dynamically imported by apps/web/src/site-resolver/renderDispatch.tsx
 * when `Site.type === 'hero'` and `Site.slug === 'streetfoodrome'`.
 *
 * Not template-built (blueprint §5.2): switches on slug/pageType itself
 * rather than delegating to packages/templates/src/registry.ts.
 */
import { HomeLayout } from './layouts/HomeLayout';
import { MoneyPageLayout } from './layouts/MoneyPageLayout';
import { SupportPageLayout } from './layouts/SupportPageLayout';
import type { StreetFoodRomePageProps } from './types';

export default function StreetFoodRomeSite(props: StreetFoodRomePageProps) {
  if (props.slug === 'home') {
    return <HomeLayout {...props} />;
  }
  if (props.pageType === 'money') {
    return <MoneyPageLayout {...props} />;
  }
  return <SupportPageLayout {...props} />;
}
