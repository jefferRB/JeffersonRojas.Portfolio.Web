/** Locales the site is published in. English is primary, Spanish secondary. */
export const SUPPORTED_LOCALES = ['en', 'es'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** BCP 47 tags used for the `lang` attribute, `hreflang` and Open Graph. */
export const LOCALE_TAGS: Readonly<Record<Locale, string>> = {
  en: 'en',
  es: 'es',
};

export const OPEN_GRAPH_LOCALES: Readonly<Record<Locale, string>> = {
  en: 'en_US',
  es: 'es_CR',
};

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

interface ParsedUrl {
  readonly segments: string[];
  readonly query: string;
  readonly fragment: string;
}

function parseUrl(url: string): ParsedUrl {
  const [beforeFragment, ...fragmentParts] = url.split('#');
  const fragment = fragmentParts.length > 0 ? `#${fragmentParts.join('#')}` : '';

  const [path, ...queryParts] = beforeFragment.split('?');
  const query = queryParts.length > 0 ? `?${queryParts.join('?')}` : '';

  return {
    segments: path.split('/').filter((segment) => segment.length > 0),
    query,
    fragment,
  };
}

/**
 * Reads the locale from the first path segment of a router URL.
 * Falls back to the default locale for `/`, unknown prefixes or empty input.
 */
export function localeFromUrl(url: string): Locale {
  const [first] = parseUrl(url).segments;
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/**
 * Rewrites a router URL so it points at the same page in another locale.
 * Query string and fragment are preserved, which is what keeps the reader in
 * place when they switch languages.
 */
export function replaceLocaleInUrl(url: string, locale: Locale): string {
  const { segments, query, fragment } = parseUrl(url);

  if (segments.length === 0) {
    return `/${locale}${query}${fragment}`;
  }

  const rest = isLocale(segments[0]) ? segments.slice(1) : segments;

  return `/${[locale, ...rest].join('/')}${query}${fragment}`;
}

/** Builds a locale-prefixed path from a locale-agnostic path such as `''`. */
export function localizedPath(locale: Locale, path = ''): string {
  const normalized = path.replace(/^\/+|\/+$/g, '');
  return normalized.length > 0 ? `/${locale}/${normalized}` : `/${locale}`;
}
