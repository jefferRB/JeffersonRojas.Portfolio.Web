import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SITE_CONFIG } from '../config/site.config';
import {
  LOCALE_TAGS,
  Locale,
  OPEN_GRAPH_LOCALES,
  SUPPORTED_LOCALES,
  localizedPath,
} from '../i18n/locale';

export interface PageMetadata {
  readonly title: string;
  readonly description: string;
  /** Locale-agnostic path, e.g. `''` for the home page or `'projects/luxurycloud'`. */
  readonly path: string;
  /** Open Graph page type. Defaults to `website`. */
  readonly type?: 'website' | 'article';
}

/**
 * Centralised document metadata.
 *
 * Everything is derived from the active locale and the site origin, so adding a
 * localised route later only means calling `apply()` with a different path.
 * DOM writes go through the injected document, which keeps this usable during
 * prerendering.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply(locale: Locale, metadata: PageMetadata): void {
    const canonical = this.absoluteUrl(locale, metadata.path);

    this.title.setTitle(metadata.title);

    this.meta.updateTag({ name: 'description', content: metadata.description });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_CONFIG.name });
    this.meta.updateTag({ property: 'og:type', content: metadata.type ?? 'website' });
    this.meta.updateTag({ property: 'og:title', content: metadata.title });
    this.meta.updateTag({ property: 'og:description', content: metadata.description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:locale', content: OPEN_GRAPH_LOCALES[locale] });
    // No og:image yet: no real artwork exists and no remote asset is referenced.
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: metadata.title });
    this.meta.updateTag({ name: 'twitter:description', content: metadata.description });

    this.setLink('canonical', canonical);

    for (const alternate of SUPPORTED_LOCALES) {
      this.setLink('alternate', this.absoluteUrl(alternate, metadata.path), LOCALE_TAGS[alternate]);
    }

    this.setLink('alternate', this.absoluteUrl('en', metadata.path), 'x-default');
  }

  private absoluteUrl(locale: Locale, path: string): string {
    return `${SITE_CONFIG.origin}${localizedPath(locale, path)}`;
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const head = this.document.head;
    const selector =
      hreflang === undefined
        ? `link[rel="${rel}"]:not([hreflang])`
        : `link[rel="${rel}"][hreflang="${hreflang}"]`;

    let link = head.querySelector<HTMLLinkElement>(selector);

    if (link === null) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);

      if (hreflang !== undefined) {
        link.setAttribute('hreflang', hreflang);
      }

      head.appendChild(link);
    }

    link.setAttribute('href', href);
  }
}
