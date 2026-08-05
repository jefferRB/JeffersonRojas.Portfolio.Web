import { describe, expect, it } from 'vitest';

import { SUPPORTED_LOCALES } from '../locale';
import { TRANSLATIONS } from './index';

/**
 * Guards against content that must never reach the published site.
 *
 * Walks every string in every dictionary, so a forbidden term cannot slip in
 * through a key nobody thought to check.
 */
function collectStrings(value: unknown, path: string, into: Map<string, string>): void {
  if (typeof value === 'string') {
    into.set(path, value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectStrings(entry, `${path}[${index}]`, into));
    return;
  }

  if (typeof value === 'object' && value !== null) {
    for (const [key, entry] of Object.entries(value)) {
      collectStrings(entry, `${path}.${key}`, into);
    }
  }
}

const ALL_STRINGS = new Map<string, string>();
for (const locale of SUPPORTED_LOCALES) {
  collectStrings(TRANSLATIONS[locale], locale, ALL_STRINGS);
}

function findMatches(pattern: RegExp): string[] {
  const hits: string[] = [];

  for (const [path, text] of ALL_STRINGS) {
    if (pattern.test(text)) {
      hits.push(`${path}: "${text}"`);
    }
  }

  return hits;
}

describe('published content integrity', () => {
  it('collects strings from both dictionaries', () => {
    // Sanity check: if the walker silently returned nothing, every assertion
    // below would pass for the wrong reason.
    expect(ALL_STRINGS.size).toBeGreaterThan(150);
  });

  it('never mentions La Catalina', () => {
    expect(findMatches(/catalina/i)).toEqual([]);
  });

  it('never names the company the résumé was tailored for', () => {
    expect(findMatches(/terumo/i)).toEqual([]);
  });

  it('claims no healthcare or regulated-industry experience', () => {
    expect(findMatches(/healthcare|clinical trial|FDA|regulatory affairs/i)).toEqual([]);
  });

  it('does not publish the phone number', () => {
    expect(findMatches(/\+506|8672/)).toEqual([]);
  });

  it('states no invented seniority titles', () => {
    expect(findMatches(/\bCEO\b|Senior Software Engineer|10x developer|visionary/i)).toEqual([]);
  });

  it('quotes no user counts, revenue or percentage metrics', () => {
    expect(findMatches(/\d+\s?%|\d+\s?(users|customers|clients|tenants)\b/i)).toEqual([]);
    expect(findMatches(/\$\s?\d|\bUSD\b|\brevenue\b|\bingresos de\b/i)).toEqual([]);
  });

  it('claims no years of experience', () => {
    expect(findMatches(/\d+\+?\s?(years|años)\s+(of\s+)?(experience|de\s+experiencia)/i)).toEqual(
      [],
    );
  });

  it('claims no external certification or audit', () => {
    expect(findMatches(/ISO\s?\d|SOC\s?2|certified|certificad[oa]/i)).toEqual([]);
  });

  it('describes NexoPOS as a prototype and PersonalOS as unfinished', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const [nexopos, personalos] = TRANSLATIONS[locale].work.others;

      expect(nexopos.id).toBe('nexopos');
      expect(nexopos.status.toLowerCase()).toMatch(/prototype|prototipo/);
      expect(nexopos.status.toLowerCase()).not.toMatch(/production|producción/);

      expect(personalos.id).toBe('personalos');
      expect(personalos.status.toLowerCase()).toMatch(/in development|en desarrollo/);
      expect(personalos.status.toLowerCase()).not.toMatch(/complete|finished|finalizad/);
    }
  });

  it('keeps both dictionaries structurally identical', () => {
    const paths = SUPPORTED_LOCALES.map((locale) => {
      const strings = new Map<string, string>();
      collectStrings(TRANSLATIONS[locale], '', strings);
      return [...strings.keys()].sort();
    });

    expect(paths[0]).toEqual(paths[1]);
  });

  it('leaves no untranslated Spanish entries', () => {
    const identical: string[] = [];
    const enStrings = new Map<string, string>();
    const esStrings = new Map<string, string>();
    collectStrings(TRANSLATIONS.en, '', enStrings);
    collectStrings(TRANSLATIONS.es, '', esStrings);

    // Proper nouns and technology names are legitimately identical; prose is
    // not. `hero.title` is the name itself, so it is excluded by design.
    const proseKeys = [
      '.hero.subtitle',
      '.hero.description',
      '.hero.secondary',
      '.about.paragraphs',
      '.contact.message',
      '.work.lead',
    ];

    for (const [path, english] of enStrings) {
      if (!proseKeys.some((key) => path.startsWith(key))) {
        continue;
      }

      if (esStrings.get(path) === english) {
        identical.push(path);
      }
    }

    expect(identical).toEqual([]);
  });
});
