import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { EN_TRANSLATIONS } from '../../../core/i18n/translations/en';
import { ScreenshotAsset } from '../../models/screenshot';
import { Screenshot } from './screenshot';

const PUBLISHED: ScreenshotAsset = {
  id: 'dashboard',
  src: '/images/projects/luxurycloud/dashboard.webp',
  width: 1874,
  height: 838,
  available: true,
};

const UNPUBLISHED: ScreenshotAsset = { ...PUBLISHED, available: false };

const COPY = EN_TRANSLATIONS.screenshots.items.dashboard;

async function render(asset: ScreenshotAsset): Promise<ComponentFixture<Screenshot>> {
  const fixture = TestBed.createComponent(Screenshot);
  fixture.componentRef.setInput('asset', asset);
  fixture.componentRef.setInput('alt', COPY.alt);
  fixture.componentRef.setInput('caption', COPY.caption);
  await fixture.whenStable();
  return fixture;
}

describe('Screenshot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  describe('when the file is not published yet', () => {
    it('renders a labelled slot instead of a broken image', async () => {
      const fixture = await render(UNPUBLISHED);
      const element = fixture.nativeElement as HTMLElement;

      expect(element.querySelector('img')).toBeNull();
      expect(element.querySelector('.shot__slot')).not.toBeNull();
      expect(element.textContent).toContain(EN_TRANSLATIONS.screenshots.pending);
    });

    it('reserves the real aspect ratio so nothing shifts when the file lands', async () => {
      const fixture = await render(UNPUBLISHED);
      const slot = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.shot__slot');

      expect(slot?.style.aspectRatio.replace(/\s/g, '')).toBe('1874/838');
    });

    it('renders no dialog, since there is nothing to enlarge', async () => {
      const fixture = await render(UNPUBLISHED);

      expect((fixture.nativeElement as HTMLElement).querySelector('dialog')).toBeNull();
    });
  });

  describe('when the file is published', () => {
    it('renders the image with intrinsic dimensions and the alt text', async () => {
      const fixture = await render(PUBLISHED);
      const image = (fixture.nativeElement as HTMLElement).querySelector('img');

      expect(image?.getAttribute('src')).toBe(PUBLISHED.src);
      expect(image?.getAttribute('alt')).toBe(COPY.alt);
      // width/height are what prevent layout shift while the file downloads.
      expect(image?.getAttribute('width')).toBe('1874');
      expect(image?.getAttribute('height')).toBe('838');
    });

    it('lazy-loads by default and eagerly loads only when marked priority', async () => {
      const lazy = await render(PUBLISHED);
      expect(
        (lazy.nativeElement as HTMLElement).querySelector('img')?.getAttribute('loading'),
      ).toBe('lazy');

      const eager = await render(PUBLISHED);
      eager.componentRef.setInput('priority', true);
      await eager.whenStable();
      const image = (eager.nativeElement as HTMLElement).querySelector('img');

      expect(image?.getAttribute('loading')).toBe('eager');
      expect(image?.getAttribute('fetchpriority')).toBe('high');
    });

    it('shows the caption', async () => {
      const fixture = await render(PUBLISHED);

      expect(
        (fixture.nativeElement as HTMLElement).querySelector('figcaption')?.textContent,
      ).toContain(COPY.caption);
    });

    it('uses a figure so the caption is associated with the image', async () => {
      const fixture = await render(PUBLISHED);
      const figure = (fixture.nativeElement as HTMLElement).querySelector('figure');

      expect(figure?.querySelector('img')).not.toBeNull();
      expect(figure?.querySelector('figcaption')).not.toBeNull();
    });

    describe('enlarged view', () => {
      function dialogOf(fixture: ComponentFixture<Screenshot>): HTMLDialogElement {
        const dialog = (fixture.nativeElement as HTMLElement).querySelector('dialog');

        if (dialog === null) {
          throw new Error('The enlarge dialog is missing.');
        }

        return dialog as HTMLDialogElement;
      }

      it('names the trigger and the dialog', async () => {
        const fixture = await render(PUBLISHED);
        const element = fixture.nativeElement as HTMLElement;

        expect(element.querySelector('.shot__trigger')?.getAttribute('aria-label')).toBe(
          EN_TRANSLATIONS.screenshots.zoomLabel,
        );
        expect(dialogOf(fixture).getAttribute('aria-label')).toBe(
          EN_TRANSLATIONS.screenshots.dialogLabel,
        );
      });

      it('keeps the enlarged image out of the DOM until opened', async () => {
        const fixture = await render(PUBLISHED);

        // Only the inline image exists; a second copy would download twice.
        expect((fixture.nativeElement as HTMLElement).querySelectorAll('img').length).toBe(1);
      });

      it('opens on click and renders the enlarged image', async () => {
        const fixture = await render(PUBLISHED);
        const element = fixture.nativeElement as HTMLElement;

        element.querySelector<HTMLButtonElement>('.shot__trigger')?.click();
        await fixture.whenStable();

        expect(dialogOf(fixture).open).toBe(true);
        expect(element.querySelectorAll('img').length).toBe(2);
      });

      it('closes from the close button and drops the enlarged image again', async () => {
        const fixture = await render(PUBLISHED);
        const element = fixture.nativeElement as HTMLElement;

        element.querySelector<HTMLButtonElement>('.shot__trigger')?.click();
        await fixture.whenStable();

        element.querySelector<HTMLButtonElement>('.shot-dialog__bar button')?.click();
        await fixture.whenStable();

        expect(dialogOf(fixture).open).toBe(false);
        expect(element.querySelectorAll('img').length).toBe(1);
      });

      it('reacts to the native close event, which is what Escape fires', async () => {
        const fixture = await render(PUBLISHED);
        const element = fixture.nativeElement as HTMLElement;

        element.querySelector<HTMLButtonElement>('.shot__trigger')?.click();
        await fixture.whenStable();

        // The native dialog handles Escape itself and emits `close`.
        dialogOf(fixture).dispatchEvent(new Event('close'));
        await fixture.whenStable();

        expect(element.querySelectorAll('img').length).toBe(1);
      });

      it('offers a visible close control, not only Escape', async () => {
        const fixture = await render(PUBLISHED);
        const element = fixture.nativeElement as HTMLElement;

        element.querySelector<HTMLButtonElement>('.shot__trigger')?.click();
        await fixture.whenStable();

        const close = element.querySelector('.shot-dialog__bar button');
        expect(close?.textContent).toContain(EN_TRANSLATIONS.screenshots.close);
        expect(close?.classList.contains('visually-hidden')).toBe(false);
      });
    });
  });
});
