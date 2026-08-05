import { Route, Routes } from '@angular/router';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './core/i18n/locale';
import { HomePage } from './features/home/home-page/home-page';
import { LuxuryCloudPage } from './features/projects/luxurycloud/luxurycloud-page/luxurycloud-page';
import { CASE_STUDY_PATHS } from './features/projects/project.routes';

/**
 * Every public route is locale-prefixed: `/en`, `/es`. The prefixes are
 * declared explicitly (rather than through a `:locale` parameter) so the router
 * config alone lists every localised URL, which is what a future prerender pass
 * needs to discover them.
 *
 * Path segments after the prefix are identical in both locales, so switching
 * language only swaps the prefix and keeps the reader on the same page.
 */
const localizedRoutes: Routes = SUPPORTED_LOCALES.map((locale): Route => ({
  path: locale,
  data: { locale },
  children: [
    { path: '', component: HomePage },
    { path: CASE_STUDY_PATHS.luxurycloud, component: LuxuryCloudPage },
  ],
}));

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `/${DEFAULT_LOCALE}` },
  ...localizedRoutes,
  { path: '**', redirectTo: `/${DEFAULT_LOCALE}` },
];
