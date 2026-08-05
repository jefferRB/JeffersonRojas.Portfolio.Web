import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { TECHNOLOGIES } from '../../../core/config/technologies.config';
import { EN_TRANSLATIONS } from '../../../core/i18n/translations/en';
import { TechStrip } from './tech-strip';

const COPY = EN_TRANSLATIONS.toolkit.strip;

const originalMatchMedia = window.matchMedia;

/** The setup file installs a neutral stub; this one answers a single query. */
function stubReducedMotion(matches: boolean): void {
  window.matchMedia = ((query: string) =>
    ({
      matches: query.includes('prefers-reduced-motion') ? matches : false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }) as unknown as MediaQueryList) as typeof window.matchMedia;
}

async function render(): Promise<ComponentFixture<TechStrip>> {
  const fixture = TestBed.createComponent(TechStrip);
  fixture.componentRef.setInput('copy', COPY);
  await fixture.whenStable();
  return fixture;
}

function element(fixture: ComponentFixture<TechStrip>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function tracks(fixture: ComponentFixture<TechStrip>): HTMLElement[] {
  return Array.from(element(fixture).querySelectorAll<HTMLElement>('.marquee__track'));
}

describe('TechStrip', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  describe('with motion allowed', () => {
    beforeEach(() => stubReducedMotion(false));

    it('runs two identical tracks, which is what makes the loop seamless', async () => {
      const fixture = await render();
      const [first, second] = tracks(fixture);

      expect(tracks(fixture).length).toBe(2);
      expect(first.querySelectorAll('.marquee__item').length).toBe(TECHNOLOGIES.length);
      expect(second.querySelectorAll('.marquee__item').length).toBe(TECHNOLOGIES.length);
    });

    it('lets assistive technology read the technologies once, not twice', async () => {
      const fixture = await render();
      const [first, second] = tracks(fixture);

      expect(first.getAttribute('aria-hidden')).toBeNull();
      expect(first.getAttribute('aria-label')).toBe(COPY.label);
      // The duplicate is scenery.
      expect(second.getAttribute('aria-hidden')).toBe('true');
      expect(second.getAttribute('aria-label')).toBeNull();
    });

    it('names every technology in order', async () => {
      const fixture = await render();
      const names = Array.from(tracks(fixture)[0].querySelectorAll('.marquee__name')).map((node) =>
        node.textContent?.trim(),
      );

      expect(names).toEqual(TECHNOLOGIES.map((technology) => technology.name));
    });

    it('leads with the mark and hides it from assistive technology', async () => {
      const fixture = await render();
      const items = Array.from(tracks(fixture)[0].querySelectorAll('.marquee__item'));

      for (const [index, item] of items.entries()) {
        const svg = item.querySelector('svg');
        expect(svg, TECHNOLOGIES[index].id).not.toBeNull();
        // The name underneath carries the meaning; the drawing is decoration.
        expect(svg?.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('is focusable, so the movement can be stopped without a pointer', async () => {
      const fixture = await render();

      // The stylesheet pauses on :focus-within. Without a tab stop the only way
      // to stop it would be hovering, which a keyboard user cannot do.
      expect(tracks(fixture)[0].getAttribute('tabindex')).toBe('0');
    });
  });

  describe('with reduced motion requested', () => {
    beforeEach(() => stubReducedMotion(true));

    it('marks itself static so the stylesheet can stop the animation', async () => {
      const fixture = await render();

      expect(element(fixture).querySelector('.marquee')?.classList.contains('is-static')).toBe(
        true,
      );
    });

    it('keeps the tab stop, now as the handle for panning the static row', async () => {
      const fixture = await render();

      // The stylesheet hides the duplicate and turns the remaining track into a
      // scroller; without a tab stop it could not be reached.
      expect(tracks(fixture)[0].getAttribute('tabindex')).toBe('0');
    });

    it('still lists every technology', async () => {
      const fixture = await render();

      expect(tracks(fixture)[0].querySelectorAll('.marquee__item').length).toBe(
        TECHNOLOGIES.length,
      );
    });
  });
});
