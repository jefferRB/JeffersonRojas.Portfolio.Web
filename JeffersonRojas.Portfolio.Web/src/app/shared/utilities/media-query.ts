import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, DestroyRef, PLATFORM_ID, Signal, inject, signal } from '@angular/core';

/**
 * Exposes a CSS media query as a reactive signal.
 *
 * Must be called from an injection context (field initialiser or constructor).
 * On the server — or in any environment without `matchMedia` — it returns a
 * constant `false` signal instead of touching `window`, which keeps callers
 * safe under prerendering.
 */
export function createMediaQuerySignal(query: string): Signal<boolean> {
  const platformId = inject(PLATFORM_ID);
  const view = inject(DOCUMENT).defaultView;

  if (!isPlatformBrowser(platformId) || typeof view?.matchMedia !== 'function') {
    return signal(false).asReadonly();
  }

  const mediaQueryList = view.matchMedia(query);
  const matches = signal(mediaQueryList.matches);
  const onChange = (event: MediaQueryListEvent): void => matches.set(event.matches);

  mediaQueryList.addEventListener('change', onChange);
  inject(DestroyRef).onDestroy(() => mediaQueryList.removeEventListener('change', onChange));

  return matches.asReadonly();
}
