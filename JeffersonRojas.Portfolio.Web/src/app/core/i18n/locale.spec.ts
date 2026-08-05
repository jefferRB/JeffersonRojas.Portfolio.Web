import { describe, expect, it } from 'vitest';

import { isLocale, localeFromUrl, localizedPath, replaceLocaleInUrl } from './locale';

describe('locale URL helpers', () => {
  describe('localeFromUrl', () => {
    it('reads the locale from the first path segment', () => {
      expect(localeFromUrl('/es')).toBe('es');
      expect(localeFromUrl('/en')).toBe('en');
      expect(localeFromUrl('/es/projects')).toBe('es');
    });

    it('falls back to the default locale for the root and unknown prefixes', () => {
      expect(localeFromUrl('/')).toBe('en');
      expect(localeFromUrl('')).toBe('en');
      expect(localeFromUrl('/fr/projects')).toBe('en');
    });

    it('ignores the query string and the fragment', () => {
      expect(localeFromUrl('/es?ref=cv#work')).toBe('es');
    });
  });

  describe('replaceLocaleInUrl', () => {
    it('swaps the locale prefix', () => {
      expect(replaceLocaleInUrl('/en', 'es')).toBe('/es');
    });

    it('keeps the rest of the path so the reader stays on the same page', () => {
      expect(replaceLocaleInUrl('/en/projects/luxurycloud', 'es')).toBe('/es/projects/luxurycloud');
    });

    it('preserves the query string and the fragment', () => {
      expect(replaceLocaleInUrl('/en/projects?sort=recent#work', 'es')).toBe(
        '/es/projects?sort=recent#work',
      );
    });

    it('adds a prefix when the URL has none', () => {
      expect(replaceLocaleInUrl('/', 'es')).toBe('/es');
      expect(replaceLocaleInUrl('/projects', 'es')).toBe('/es/projects');
    });
  });

  describe('localizedPath', () => {
    it('builds locale-prefixed paths', () => {
      expect(localizedPath('en')).toBe('/en');
      expect(localizedPath('es', 'projects')).toBe('/es/projects');
      expect(localizedPath('es', '/projects/')).toBe('/es/projects');
    });
  });

  describe('isLocale', () => {
    it('accepts only supported locales', () => {
      expect(isLocale('en')).toBe(true);
      expect(isLocale('es')).toBe(true);
      expect(isLocale('fr')).toBe(false);
      expect(isLocale(undefined)).toBe(false);
    });
  });
});
