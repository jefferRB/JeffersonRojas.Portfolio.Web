import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { EN_TRANSLATIONS } from '../../../core/i18n/translations/en';
import { ClientDemoCard } from './client-demo-card';

const VIDEO_ID = '_QuuepUXQlo';
const COPY = EN_TRANSLATIONS.caseStudies.luxurycloud.demo;

async function render(): Promise<ComponentFixture<ClientDemoCard>> {
  const fixture = TestBed.createComponent(ClientDemoCard);

  fixture.componentRef.setInput('videoId', VIDEO_ID);
  fixture.componentRef.setInput('label', COPY.label);
  fixture.componentRef.setInput('title', COPY.title);
  fixture.componentRef.setInput('description', COPY.description);
  fixture.componentRef.setInput('actionLabel', COPY.action);
  fixture.componentRef.setInput('thumbnailAlt', COPY.thumbnailAlt);
  await fixture.whenStable();

  return fixture;
}

function root(fixture: ComponentFixture<ClientDemoCard>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

async function openFrom(
  fixture: ComponentFixture<ClientDemoCard>,
  selector: string,
): Promise<HTMLElement> {
  const trigger = root(fixture).querySelector<HTMLElement>(selector);

  if (trigger === null) {
    throw new Error(`No trigger matched ${selector}.`);
  }

  trigger.click();
  await fixture.whenStable();

  return trigger;
}

describe('ClientDemoCard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  describe('before any interaction', () => {
    it('renders no iframe at all: YouTube is not contacted on load', async () => {
      const fixture = await render();

      expect(root(fixture).querySelector('iframe')).toBeNull();
    });

    it('shows the copy that explains what the recording is', async () => {
      const text = root(await render()).textContent ?? '';

      expect(text).toContain(COPY.label);
      expect(text).toContain(COPY.title);
      expect(text).toContain(COPY.description);
      expect(text).toContain(COPY.action);
    });

    it('lazy-loads the still frame and reserves its box', async () => {
      const image = root(await render()).querySelector('img');

      expect(image?.getAttribute('loading')).toBe('lazy');
      expect(image?.getAttribute('decoding')).toBe('async');
      // Intrinsic dimensions plus the 16:9 frame: nothing shifts when it lands.
      expect(image?.getAttribute('width')).toBe('1280');
      expect(image?.getAttribute('height')).toBe('720');
      expect(image?.getAttribute('alt')).toBe(COPY.thumbnailAlt);
    });

    it('asks for the full-resolution still first', async () => {
      const image = root(await render()).querySelector('img');

      expect(image?.getAttribute('src')).toBe(
        `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
      );
    });

    it('falls back to the still every upload has when that one 404s', async () => {
      const fixture = await render();
      const image = root(fixture).querySelector('img');

      image?.dispatchEvent(new Event('error'));
      await fixture.whenStable();

      expect(root(fixture).querySelector('img')?.getAttribute('src')).toBe(
        `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`,
      );
    });

    it('names the still-frame trigger after the video it plays', async () => {
      const trigger = root(await render()).querySelector('.demo-card__preview');

      expect(trigger?.getAttribute('aria-label')).toContain(COPY.title);
    });

    it('hides the play indicator from assistive technology', async () => {
      // The button around it already carries the name; a second one would be
      // read out twice.
      expect(
        root(await render())
          .querySelector('.demo-card__play')
          ?.getAttribute('aria-hidden'),
      ).toBe('true');
    });
  });

  describe('once the reader asks for playback', () => {
    function dialogOf(fixture: ComponentFixture<ClientDemoCard>): HTMLDialogElement {
      const dialog = root(fixture).querySelector('dialog');

      if (dialog === null) {
        throw new Error('The player dialog is missing.');
      }

      return dialog as HTMLDialogElement;
    }

    it('mounts the frame on the privacy-enhanced domain', async () => {
      const fixture = await render();
      await openFrom(fixture, '.demo-card__preview');

      const frame = root(fixture).querySelector('iframe');
      expect(frame?.getAttribute('src')).toContain(
        `https://www.youtube-nocookie.com/embed/${VIDEO_ID}`,
      );
      expect(frame?.getAttribute('src')).not.toContain('youtube.com/embed');
    });

    it('allows fullscreen playback', async () => {
      const fixture = await render();
      await openFrom(fixture, '.demo-card__preview');

      expect(root(fixture).querySelector('iframe')?.hasAttribute('allowfullscreen')).toBe(true);
    });

    it('opens from the action as well as from the still', async () => {
      const fixture = await render();
      await openFrom(fixture, '.demo-card__action');

      expect(root(fixture).querySelector('iframe')).not.toBeNull();
    });

    it('offers a visible close control, not only Escape', async () => {
      const fixture = await render();
      await openFrom(fixture, '.demo-card__preview');

      const close = root(fixture).querySelector('.demo-dialog__bar button');
      expect(close?.textContent).toContain(EN_TRANSLATIONS.videoDemo.close);
      expect(close?.classList.contains('visually-hidden')).toBe(false);
    });

    it('drops the frame again when it closes, so nothing keeps playing', async () => {
      const fixture = await render();
      await openFrom(fixture, '.demo-card__preview');

      root(fixture).querySelector<HTMLButtonElement>('.demo-dialog__bar button')?.click();
      await fixture.whenStable();

      expect(root(fixture).querySelector('iframe')).toBeNull();
    });

    it('reacts to the native close event, which is what Escape fires', async () => {
      const fixture = await render();
      await openFrom(fixture, '.demo-card__preview');

      dialogOf(fixture).dispatchEvent(new Event('close'));
      await fixture.whenStable();

      expect(root(fixture).querySelector('iframe')).toBeNull();
    });

    it('hands focus back to the control that opened it', async () => {
      const fixture = await render();
      root(fixture).querySelector('.demo-card__action');

      // The card has two triggers, so the reader has to land back on their own.
      const trigger = await openFrom(fixture, '.demo-card__action');
      dialogOf(fixture).dispatchEvent(new Event('close'));
      await fixture.whenStable();

      expect(document.activeElement).toBe(trigger);
    });

    it('holds the page still while the player is open, and releases it after', async () => {
      const fixture = await render();
      await openFrom(fixture, '.demo-card__preview');

      expect(document.documentElement.style.overflow).toBe('hidden');

      dialogOf(fixture).dispatchEvent(new Event('close'));
      await fixture.whenStable();

      expect(document.documentElement.style.overflow).toBe('');
    });

    it('releases the page even if the component is destroyed mid-playback', async () => {
      const fixture = await render();
      await openFrom(fixture, '.demo-card__preview');

      fixture.destroy();

      expect(document.documentElement.style.overflow).toBe('');
    });
  });

  it('renders no frame for an id that is not shaped like a YouTube id', async () => {
    const fixture = await render();
    fixture.componentRef.setInput('videoId', 'not a video id');
    await fixture.whenStable();

    await openFrom(fixture, '.demo-card__preview');

    expect(root(fixture).querySelector('iframe')).toBeNull();
  });
});
