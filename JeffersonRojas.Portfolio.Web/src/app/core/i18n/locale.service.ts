import { DOCUMENT, Injectable, Signal, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { LOCALE_TAGS, Locale, localeFromUrl, replaceLocaleInUrl } from './locale';

/**
 * Owns "which locale is the reader on".
 *
 * The URL is the single source of truth: `/en/...` and `/es/...`. Nothing is
 * persisted, which keeps every page shareable and prerenderable per locale.
 */
@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  private readonly lastNavigation = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ),
    { initialValue: null },
  );

  /** Current router URL, including query string and fragment. */
  readonly url: Signal<string> = computed(() => {
    const navigation = this.lastNavigation();
    return navigation === null ? this.router.url : navigation.urlAfterRedirects;
  });

  /** Locale resolved from the first path segment. */
  readonly locale: Signal<Locale> = computed(() => localeFromUrl(this.url()));

  constructor() {
    effect(() => {
      this.document.documentElement.lang = LOCALE_TAGS[this.locale()];
    });
  }

  /** URL of the current page in another locale, preserving path and fragment. */
  urlForLocale(locale: Locale): string {
    return replaceLocaleInUrl(this.url(), locale);
  }

  /** Navigates to the equivalent page in `locale`. */
  switchTo(locale: Locale): Promise<boolean> {
    return this.router.navigateByUrl(this.urlForLocale(locale));
  }
}
