import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { RESUME_CONFIG } from '../../../../core/config/site.config';
import { EN_TRANSLATIONS } from '../../../../core/i18n/translations/en';
import { ES_TRANSLATIONS } from '../../../../core/i18n/translations/es';
import { Hero } from './hero';

@Component({ template: '' })
class TestPage {}

const testRoutes: Routes = [
  { path: 'en', component: TestPage },
  { path: 'es', component: TestPage },
];

async function renderHeroAt(url: string): Promise<ComponentFixture<Hero>> {
  await RouterTestingHarness.create(url);

  const fixture = TestBed.createComponent(Hero);
  await fixture.whenStable();

  return fixture;
}

describe('Hero', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(testRoutes)] });
  });

  it('renders the English copy', async () => {
    const fixture = await renderHeroAt('/en');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent?.trim()).toBe(EN_TRANSLATIONS.hero.title);
    expect(element.textContent).toContain(EN_TRANSLATIONS.hero.subtitle);
    expect(element.textContent).toContain(EN_TRANSLATIONS.hero.description);
    expect(element.textContent).toContain(EN_TRANSLATIONS.hero.secondary);
  });

  it('makes the name the page heading, in both languages', async () => {
    // The h1 is the person, not a slogan: the role belongs underneath it.
    for (const [url, dictionary] of [
      ['/en', EN_TRANSLATIONS],
      ['/es', ES_TRANSLATIONS],
    ] as const) {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({ providers: [provideRouter(testRoutes)] });

      const element = (await renderHeroAt(url)).nativeElement as HTMLElement;

      expect(element.querySelector('h1')?.textContent?.trim()).toBe('Jefferson Rojas');
      expect(element.querySelector('.hero__subtitle')?.textContent?.trim()).toBe(
        dictionary.hero.subtitle,
      );
    }
  });

  it('renders the Spanish copy on the /es route without a second component', async () => {
    const fixture = await renderHeroAt('/es');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain(ES_TRANSLATIONS.hero.description);
    expect(element.textContent).toContain(ES_TRANSLATIONS.hero.actions.viewWork);
  });

  it('offers the résumé as a real download with the format in its accessible name', async () => {
    const fixture = await renderHeroAt('/en');
    const element = fixture.nativeElement as HTMLElement;
    const link = element.querySelector<HTMLAnchorElement>('a[download]');

    expect(RESUME_CONFIG.available).toBe(true);
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe(RESUME_CONFIG.path);
    expect(link?.getAttribute('aria-label')).toBe(
      `${EN_TRANSLATIONS.common.downloadResume} (${EN_TRANSLATIONS.common.resumeFormatLabel})`,
    );
    // The pending state must be gone now that a real PDF exists.
    expect(element.querySelector('[aria-disabled="true"]')).toBeNull();
  });

  it('labels the résumé download in Spanish too', async () => {
    const fixture = await renderHeroAt('/es');
    const link = (fixture.nativeElement as HTMLElement).querySelector('a[download]');

    expect(link?.getAttribute('aria-label')).toBe(
      `${ES_TRANSLATIONS.common.downloadResume} (${ES_TRANSLATIONS.common.resumeFormatLabel})`,
    );
  });

  describe('production pipeline visual', () => {
    it('renders every step as real, ordered text', async () => {
      const fixture = await renderHeroAt('/en');
      const element = fixture.nativeElement as HTMLElement;
      const steps = element.querySelectorAll('.pipeline__label');

      expect(Array.from(steps).map((step) => step.textContent?.trim())).toEqual([
        'Discovery',
        'Requirements',
        'Architecture',
        'Software product',
        'Production feedback',
      ]);
    });

    it('exposes the pipeline as a labelled list and hides its connectors', async () => {
      const fixture = await renderHeroAt('/en');
      const element = fixture.nativeElement as HTMLElement;
      const pipeline = element.querySelector('.pipeline');

      expect(pipeline?.tagName).toBe('OL');
      expect(pipeline?.getAttribute('aria-label')).toBe(EN_TRANSLATIONS.hero.flow.label);

      for (const marker of Array.from(element.querySelectorAll('.pipeline__marker'))) {
        expect(marker.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('translates the pipeline', async () => {
      const fixture = await renderHeroAt('/es');
      const element = fixture.nativeElement as HTMLElement;

      expect(element.textContent).toContain('Retroalimentación en producción');
    });
  });
});
