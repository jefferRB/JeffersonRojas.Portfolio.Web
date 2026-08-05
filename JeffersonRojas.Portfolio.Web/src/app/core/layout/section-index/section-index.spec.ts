import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { EN_TRANSLATIONS } from '../../i18n/translations/en';
import { ES_TRANSLATIONS } from '../../i18n/translations/es';
import { CaseStudyContext } from '../case-study-context';
import { SectionIndex } from './section-index';

@Component({ template: '' })
class TestPage {}

const testRoutes: Routes = [
  { path: 'en', component: TestPage },
  { path: 'es', component: TestPage },
  { path: 'en/projects/luxurycloud', component: TestPage },
];

async function render(url: string): Promise<ComponentFixture<SectionIndex>> {
  await RouterTestingHarness.create(url);

  const fixture = TestBed.createComponent(SectionIndex);
  await fixture.whenStable();

  return fixture;
}

function links(fixture: ComponentFixture<SectionIndex>): HTMLAnchorElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.index__link'),
  );
}

describe('SectionIndex', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(testRoutes)] });
  });

  describe('portfolio routes', () => {
    it('lists the English sections in order', async () => {
      const fixture = await render('/en');

      expect(links(fixture).map((link) => link.textContent?.trim())).toEqual(
        EN_TRANSLATIONS.nav.items.map((item) => item.label),
      );
    });

    it('lists the Spanish sections in order', async () => {
      const fixture = await render('/es');

      expect(links(fixture).map((link) => link.textContent?.trim())).toEqual(
        ES_TRANSLATIONS.nav.items.map((item) => item.label),
      );
    });

    it('points every entry at the real section id on the current page', async () => {
      const fixture = await render('/en');

      expect(links(fixture).map((link) => link.getAttribute('href'))).toEqual(
        EN_TRANSLATIONS.nav.items.map((item) => `/en#${item.id}`),
      );
    });

    it('navigates as ordinary anchors, with no observer involved', async () => {
      // jsdom has no IntersectionObserver, so this fixture is rendered in
      // exactly the degraded state the utility falls back to. The links must
      // still resolve; only the highlight is allowed to be missing.
      const fixture = await render('/en');

      expect(links(fixture).length).toBe(EN_TRANSLATIONS.nav.items.length);
      expect(links(fixture).some((link) => link.getAttribute('aria-current') === 'location')).toBe(
        false,
      );
    });

    it('names the navigation landmark', async () => {
      const element = (await render('/en')).nativeElement as HTMLElement;

      expect(element.querySelector('nav')?.getAttribute('aria-label')).toBe(
        EN_TRANSLATIONS.nav.primaryLabel,
      );
    });

    it('exposes the collapsed trigger as a closed, labelled control', async () => {
      const element = (await render('/en')).nativeElement as HTMLElement;
      const toggle = element.querySelector<HTMLButtonElement>('.index__toggle');

      expect(toggle?.getAttribute('aria-expanded')).toBe('false');
      expect(toggle?.getAttribute('aria-controls')).toBe('section-index-list');
      expect(toggle?.textContent).toContain(EN_TRANSLATIONS.nav.openIndex);
    });

    it('opens and closes the collapsed index from the keyboard-reachable trigger', async () => {
      const fixture = await render('/en');
      const element = fixture.nativeElement as HTMLElement;
      const toggle = element.querySelector<HTMLButtonElement>('.index__toggle');

      toggle?.click();
      await fixture.whenStable();

      expect(toggle?.getAttribute('aria-expanded')).toBe('true');
      expect(element.querySelector('.index__list')?.classList.contains('is-open')).toBe(true);
      expect(toggle?.textContent).toContain(EN_TRANSLATIONS.nav.closeIndex);

      toggle?.click();
      await fixture.whenStable();

      expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    });

    it('closes on Escape', async () => {
      const fixture = await render('/en');
      const element = fixture.nativeElement as HTMLElement;

      element.querySelector<HTMLButtonElement>('.index__toggle')?.click();
      await fixture.whenStable();

      element
        .querySelector('nav')
        ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await fixture.whenStable();

      expect(element.querySelector('.index__toggle')?.getAttribute('aria-expanded')).toBe('false');
    });

    it('closes once an entry is followed', async () => {
      const fixture = await render('/en');
      const element = fixture.nativeElement as HTMLElement;

      element.querySelector<HTMLButtonElement>('.index__toggle')?.click();
      await fixture.whenStable();

      links(fixture)[0].click();
      await fixture.whenStable();

      expect(element.querySelector('.index__toggle')?.getAttribute('aria-expanded')).toBe('false');
    });

    it('carries no site controls: language and theme live in their own cluster', async () => {
      const element = (await render('/en')).nativeElement as HTMLElement;

      expect(element.querySelector('app-language-switcher')).toBeNull();
      expect(element.querySelector('app-theme-toggle')).toBeNull();
      expect(element.querySelectorAll('nav').length).toBe(1);
    });
  });

  describe('case-study routes', () => {
    beforeEach(() => {
      TestBed.inject(CaseStudyContext).activate('LuxuryCloud');
    });

    afterEach(() => {
      TestBed.inject(CaseStudyContext).clear();
    });

    it('replaces the site sections with the case outline', async () => {
      const fixture = await render('/en/projects/luxurycloud');

      expect(links(fixture).map((link) => link.textContent?.trim())).toEqual(
        EN_TRANSLATIONS.nav.caseItems.map((item) => item.label),
      );
    });

    it('anchors case entries to the case section ids', async () => {
      const fixture = await render('/en/projects/luxurycloud');

      expect(links(fixture).map((link) => link.getAttribute('href'))).toEqual(
        EN_TRANSLATIONS.nav.caseItems.map((item) => `/en/projects/luxurycloud#${item.id}`),
      );
    });

    it('names the landmark for the case outline', async () => {
      const element = (await render('/en/projects/luxurycloud')).nativeElement as HTMLElement;

      expect(element.querySelector('nav')?.getAttribute('aria-label')).toBe(
        EN_TRANSLATIONS.nav.caseNavLabel,
      );
    });
  });
});
