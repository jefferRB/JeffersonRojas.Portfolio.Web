import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { routes } from '../../../../app.routes';
import { CLIENT_DEMOS, SITE_CONFIG } from '../../../../core/config/site.config';
import { LocaleService } from '../../../../core/i18n/locale.service';
import { EN_TRANSLATIONS } from '../../../../core/i18n/translations/en';
import { ES_TRANSLATIONS } from '../../../../core/i18n/translations/es';
import { LuxuryCloudPage } from './luxurycloud-page';

const EN_URL = '/en/projects/luxurycloud';
const ES_URL = '/es/projects/luxurycloud';

function head(selector: string): Element | null {
  return document.head.querySelector(selector);
}

describe('LuxuryCloud case study', () => {
  beforeEach(() => {
    // The real application routes are used, so the test exercises the actual
    // locale-prefixed URLs rather than a stand-in configuration.
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('is reachable at the English case-study URL', async () => {
    const harness = await RouterTestingHarness.create(EN_URL);

    expect(TestBed.inject(Router).url).toBe(EN_URL);
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(LuxuryCloudPage);
  });

  it('is reachable at the Spanish case-study URL', async () => {
    await RouterTestingHarness.create(ES_URL);

    expect(TestBed.inject(Router).url).toBe(ES_URL);
  });

  it('renders the English case study', async () => {
    const harness = await RouterTestingHarness.create(EN_URL);
    const text = (harness.routeNativeElement as HTMLElement).textContent ?? '';
    const copy = EN_TRANSLATIONS.caseStudies.luxurycloud;

    expect(text).toContain(copy.name);
    expect(text).toContain(copy.tag);
    expect(text).toContain(copy.role);
    expect(text).toContain(copy.summary);
  });

  it('renders every required case-study section in Spanish', async () => {
    const harness = await RouterTestingHarness.create(ES_URL);
    const element = harness.routeNativeElement as HTMLElement;
    const text = element.textContent ?? '';
    const copy = ES_TRANSLATIONS.caseStudies.luxurycloud;

    for (const title of [
      copy.context.title,
      copy.myRole.title,
      copy.flow.title,
      copy.scope.title,
      copy.architecture.title,
      copy.challenges.title,
      copy.learned.title,
      copy.status.title,
    ]) {
      expect(text).toContain(title);
    }

    expect(text).toContain(copy.status.value);
  });

  it('presents each challenge as problem, decision and verification', async () => {
    const harness = await RouterTestingHarness.create(EN_URL);
    const element = harness.routeNativeElement as HTMLElement;
    const copy = EN_TRANSLATIONS.caseStudies.luxurycloud.challenges;

    expect(element.querySelectorAll('.challenges__item').length).toBe(copy.items.length);

    const text = element.textContent ?? '';
    for (const challenge of copy.items) {
      expect(text).toContain(challenge.title);
      expect(text).toContain(challenge.problem);
      expect(text).toContain(challenge.decision);
      expect(text).toContain(challenge.verification);
    }
  });

  it('renders the architecture layers as text, not as an image', async () => {
    const harness = await RouterTestingHarness.create(EN_URL);
    const element = harness.routeNativeElement as HTMLElement;
    const copy = EN_TRANSLATIONS.caseStudies.luxurycloud.architecture;

    const names = Array.from(element.querySelectorAll('.layers__name')).map((node) =>
      node.textContent?.trim(),
    );
    expect(names).toEqual(copy.layers.map((layer) => layer.name));

    // The diagram must stay a diagram: no screenshot replaces it.
    const architecture = element.querySelector('app-architecture-diagram');
    expect(architecture?.querySelector('img')).toBeNull();

    for (const item of copy.crossCutting.items) {
      expect(element.textContent).toContain(item);
    }
  });

  describe('reading experience', () => {
    // The captures were moved to the gallery in the home page's Projects
    // section. Placed one per argument they broke the reading and turned the
    // page into a scroll of screenshots; this keeps the case study editorial.
    it('carries no product screenshots at all', async () => {
      const harness = await RouterTestingHarness.create(EN_URL);
      const element = harness.routeNativeElement as HTMLElement;

      expect(element.querySelectorAll('app-screenshot').length).toBe(0);
      expect(element.querySelectorAll('img[src^="/images/projects"]').length).toBe(0);
    });

    // The one exception, and the reason the rule above is written by source
    // rather than by tag: the demo's still frame is not a capture of the
    // interface, it is the cover of a recording the reader can choose to play.
    it('carries exactly one image, the demo still, and one dialog, its player', async () => {
      const harness = await RouterTestingHarness.create(EN_URL);
      const element = harness.routeNativeElement as HTMLElement;

      const images = Array.from(element.querySelectorAll('img'));
      expect(images.length).toBe(1);
      expect(images[0].getAttribute('src')).toContain('i.ytimg.com');

      expect(element.querySelectorAll('dialog').length).toBe(1);
      expect(element.querySelectorAll('.demo-dialog').length).toBe(1);
    });

    it('keeps the whole technical argument, in both languages', async () => {
      for (const [url, dictionary] of [
        [EN_URL, EN_TRANSLATIONS],
        [ES_URL, ES_TRANSLATIONS],
      ] as const) {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({ providers: [provideRouter(routes)] });

        const harness = await RouterTestingHarness.create(url);
        const text = (harness.routeNativeElement as HTMLElement).textContent ?? '';
        const study = dictionary.caseStudies.luxurycloud;

        for (const paragraph of study.context.paragraphs) {
          expect(text, `context paragraph in ${url}`).toContain(paragraph);
        }
        for (const stage of study.flow.stages) {
          expect(text, `${stage.id} in ${url}`).toContain(stage.description);
        }
        for (const item of study.learned.items) {
          expect(text, `lesson in ${url}`).toContain(item);
        }
      }
    });

    it('still renders the diagram, which is drawn rather than captured', async () => {
      const harness = await RouterTestingHarness.create(EN_URL);
      const element = harness.routeNativeElement as HTMLElement;

      expect(element.querySelector('app-architecture-diagram')).not.toBeNull();
    });
  });

  describe('client-facing demo', () => {
    it('sits inside Context, beside the text rather than in a section of its own', async () => {
      const harness = await RouterTestingHarness.create(EN_URL);
      const element = harness.routeNativeElement as HTMLElement;

      expect(element.querySelectorAll('app-client-demo-card').length).toBe(1);
      expect(element.querySelector('#context app-client-demo-card')).not.toBeNull();
      // The Context copy on the left is untouched by the split.
      expect(element.querySelector('#context .case-prose p')?.textContent).toBe(
        EN_TRANSLATIONS.caseStudies.luxurycloud.context.paragraphs[0],
      );
    });

    it('loads no player: the page never contacts YouTube on its own', async () => {
      const harness = await RouterTestingHarness.create(EN_URL);
      const element = harness.routeNativeElement as HTMLElement;

      expect(element.querySelector('iframe')).toBeNull();
    });

    it('opens the player, on the no-cookie domain, only once asked', async () => {
      const harness = await RouterTestingHarness.create(EN_URL);
      const element = harness.routeNativeElement as HTMLElement;

      element.querySelector<HTMLButtonElement>('.demo-card__preview')?.click();
      await harness.fixture.whenStable();

      expect(element.querySelector('iframe')?.getAttribute('src')).toContain(
        `https://www.youtube-nocookie.com/embed/${CLIENT_DEMOS.luxurycloud.videoId}`,
      );
    });

    it('describes the recording in both languages', async () => {
      for (const [url, dictionary] of [
        [EN_URL, EN_TRANSLATIONS],
        [ES_URL, ES_TRANSLATIONS],
      ] as const) {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({ providers: [provideRouter(routes)] });

        const harness = await RouterTestingHarness.create(url);
        const text = (harness.routeNativeElement as HTMLElement).textContent ?? '';
        const demo = dictionary.caseStudies.luxurycloud.demo;

        expect(text, `label in ${url}`).toContain(demo.label);
        expect(text, `title in ${url}`).toContain(demo.title);
        expect(text, `description in ${url}`).toContain(demo.description);
        expect(text, `action in ${url}`).toContain(demo.action);
      }
    });
  });

  it('offers a way back to the portfolio projects section', async () => {
    const harness = await RouterTestingHarness.create(EN_URL);
    const element = harness.routeNativeElement as HTMLElement;
    const back = element.querySelector<HTMLAnchorElement>('.case-hero__back');

    expect(back?.textContent).toContain(EN_TRANSLATIONS.common.backToPortfolio);

    back?.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/en#projects');
  });

  it('exposes a stable id for every section in the case navigation', async () => {
    const harness = await RouterTestingHarness.create(EN_URL);
    const element = harness.routeNativeElement as HTMLElement;

    for (const item of EN_TRANSLATIONS.nav.caseItems) {
      expect(element.querySelector(`#${item.id}`), item.id).not.toBeNull();
    }
  });

  it('keeps the reader on the case study when the language changes', async () => {
    const harness = await RouterTestingHarness.create(EN_URL);
    const locale = TestBed.inject(LocaleService);

    await locale.switchTo('es');
    harness.detectChanges();

    expect(locale.url()).toBe(ES_URL);
    expect(locale.locale()).toBe('es');
  });

  it('applies localized metadata, canonical and hreflang alternates', async () => {
    const harness = await RouterTestingHarness.create(ES_URL);
    harness.detectChanges();
    await harness.fixture.whenStable();

    const meta = ES_TRANSLATIONS.meta.luxurycloud;
    expect(TestBed.inject(Title).getTitle()).toBe(meta.title);
    expect(head('meta[name="description"]')?.getAttribute('content')).toBe(meta.description);
    expect(head('meta[property="og:title"]')?.getAttribute('content')).toBe(meta.title);
    expect(head('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
    expect(head('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${SITE_CONFIG.origin}${ES_URL}`,
    );
    expect(head('link[rel="alternate"][hreflang="en"]')?.getAttribute('href')).toBe(
      `${SITE_CONFIG.origin}${EN_URL}`,
    );
  });
});
