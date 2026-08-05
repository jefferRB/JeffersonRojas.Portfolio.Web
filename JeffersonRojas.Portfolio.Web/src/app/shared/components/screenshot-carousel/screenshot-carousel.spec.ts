import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { LUXURYCLOUD_SCREENSHOTS } from '../../../core/config/screenshots.config';
import { EN_TRANSLATIONS } from '../../../core/i18n/translations/en';
import { CarouselSlide, ScreenshotCarousel } from './screenshot-carousel';

const CAROUSEL_COPY = EN_TRANSLATIONS.screenshots.carousel;

const SLIDES: readonly CarouselSlide[] = LUXURYCLOUD_SCREENSHOTS.slice(0, 3).map((asset) => ({
  asset,
  alt: EN_TRANSLATIONS.screenshots.items[asset.id].alt,
  caption: EN_TRANSLATIONS.screenshots.items[asset.id].caption,
}));

async function render(): Promise<ComponentFixture<ScreenshotCarousel>> {
  const fixture = TestBed.createComponent(ScreenshotCarousel);
  fixture.componentRef.setInput('slides', SLIDES);
  fixture.componentRef.setInput('label', 'LuxuryCloud');
  await fixture.whenStable();
  return fixture;
}

function element(fixture: ComponentFixture<ScreenshotCarousel>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function visibleImage(fixture: ComponentFixture<ScreenshotCarousel>): HTMLImageElement | null {
  return element(fixture).querySelector<HTMLImageElement>('.shot__image');
}

function dots(fixture: ComponentFixture<ScreenshotCarousel>): HTMLButtonElement[] {
  return Array.from(element(fixture).querySelectorAll<HTMLButtonElement>('.carousel__dot'));
}

async function press(fixture: ComponentFixture<ScreenshotCarousel>, label: string): Promise<void> {
  element(fixture)
    .querySelector<HTMLButtonElement>(`.carousel__arrow[aria-label="${label}"]`)
    ?.click();
  await fixture.whenStable();
}

describe('ScreenshotCarousel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('shows exactly one capture at a time', async () => {
    const fixture = await render();

    expect(element(fixture).querySelectorAll('.shot__image').length).toBe(1);
    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[0].asset.src);
  });

  it('renders a dot per capture and marks the current one', async () => {
    const fixture = await render();

    expect(dots(fixture).length).toBe(SLIDES.length);
    expect(dots(fixture)[0].getAttribute('aria-current')).toBe('true');
    expect(dots(fixture)[1].getAttribute('aria-current')).toBeNull();
  });

  it('advances and goes back through the arrows', async () => {
    const fixture = await render();

    await press(fixture, CAROUSEL_COPY.next);
    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[1].asset.src);

    await press(fixture, CAROUSEL_COPY.previous);
    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[0].asset.src);
  });

  it('wraps at both ends rather than disabling an arrow under the cursor', async () => {
    const fixture = await render();

    await press(fixture, CAROUSEL_COPY.previous);
    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[SLIDES.length - 1].asset.src);

    await press(fixture, CAROUSEL_COPY.next);
    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[0].asset.src);
  });

  it('jumps straight to a capture from its dot', async () => {
    const fixture = await render();

    dots(fixture)[2].click();
    await fixture.whenStable();

    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[2].asset.src);
    expect(dots(fixture)[2].getAttribute('aria-current')).toBe('true');
  });

  it('moves with the arrow keys from anywhere inside the gallery', async () => {
    const fixture = await render();
    const root = element(fixture).querySelector('.carousel');

    root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await fixture.whenStable();
    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[1].asset.src);

    root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await fixture.whenStable();
    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[0].asset.src);
  });

  it('ignores keys it does not own', async () => {
    const fixture = await render();

    element(fixture)
      .querySelector('.carousel')
      ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fixture.whenStable();

    expect(visibleImage(fixture)?.getAttribute('src')).toBe(SLIDES[0].asset.src);
  });

  it('swaps the caption along with the capture', async () => {
    const fixture = await render();

    expect(element(fixture).querySelector('figcaption')?.textContent).toContain(SLIDES[0].caption);

    await press(fixture, CAROUSEL_COPY.next);

    expect(element(fixture).querySelector('figcaption')?.textContent).toContain(SLIDES[1].caption);
  });

  describe('accessibility', () => {
    it('names itself as a gallery', async () => {
      const group = element(await render()).querySelector('[role="group"]');

      expect(group?.getAttribute('aria-label')).toBe('LuxuryCloud');
      expect(group?.getAttribute('aria-roledescription')).toBe(CAROUSEL_COPY.roleDescription);
    });

    it('names every control', async () => {
      const fixture = await render();
      const labels = Array.from(
        element(fixture).querySelectorAll('.carousel__arrow, .carousel__dot'),
      ).map((control) => control.getAttribute('aria-label'));

      expect(labels.every((label) => (label ?? '').length > 0)).toBe(true);
      expect(labels).toContain(CAROUSEL_COPY.previous);
      expect(labels).toContain(CAROUSEL_COPY.next);
      expect(labels).toContain('Go to screenshot 2');
    });

    it('announces the new position and what the capture shows', async () => {
      const fixture = await render();
      const live = element(fixture).querySelector('[aria-live="polite"]');

      expect(live?.textContent).toContain('Screenshot 1 of 3');

      await press(fixture, CAROUSEL_COPY.next);

      expect(live?.textContent).toContain('Screenshot 2 of 3');
      expect(live?.textContent).toContain(SLIDES[1].caption);
    });

    it('hides the visible counter from assistive technology, which reads the sentence instead', async () => {
      const counter = element(await render()).querySelector('.carousel__position');

      expect(counter?.textContent?.trim()).toBe('1 / 3');
      expect(counter?.getAttribute('aria-hidden')).toBe('true');
    });

    it('keeps the enlarge dialog of the visible capture', async () => {
      const fixture = await render();

      element(fixture).querySelector<HTMLButtonElement>('.shot__trigger')?.click();
      await fixture.whenStable();

      const dialog = element(fixture).querySelector('dialog');
      expect(dialog?.getAttribute('aria-label')).toBe(EN_TRANSLATIONS.screenshots.dialogLabel);
      expect(element(fixture).querySelector('.shot-dialog__image')?.getAttribute('src')).toBe(
        SLIDES[0].asset.src,
      );
    });
  });

  describe('loading', () => {
    it('preloads only the neighbouring captures', async () => {
      const fixture = await render();
      const preloaded = Array.from(
        element(fixture).querySelectorAll<HTMLImageElement>('.carousel__preload'),
      ).map((image) => image.getAttribute('src'));

      // Neighbours of the first slide: the next one and, by wrapping, the last.
      expect(preloaded).toHaveLength(2);
      expect(preloaded).toContain(SLIDES[1].asset.src);
      expect(preloaded).toContain(SLIDES[SLIDES.length - 1].asset.src);
      expect(preloaded).not.toContain(SLIDES[0].asset.src);
    });

    it('keeps preload images out of the accessibility tree', async () => {
      const preload = element(await render()).querySelector('.carousel__preload');

      expect(preload?.getAttribute('alt')).toBe('');
      expect(preload?.getAttribute('aria-hidden')).toBe('true');
    });

    it('loads the visible capture eagerly only when the gallery leads the page', async () => {
      const fixture = await render();
      expect(visibleImage(fixture)?.getAttribute('loading')).toBe('lazy');

      fixture.componentRef.setInput('priority', true);
      await fixture.whenStable();

      expect(visibleImage(fixture)?.getAttribute('loading')).toBe('eager');
    });
  });
});
