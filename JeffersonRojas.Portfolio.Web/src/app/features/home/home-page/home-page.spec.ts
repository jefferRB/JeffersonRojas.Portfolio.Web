import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { routes } from '../../../app.routes';
import {
  LUXURYCLOUD_SCREENSHOTS,
  PROJECT_GALLERIES,
} from '../../../core/config/screenshots.config';
import { ScreenshotGallery } from '../../../shared/models/screenshot';
import { CONTACT_CONFIG, RESUME_CONFIG } from '../../../core/config/site.config';
import { TECHNOLOGIES } from '../../../core/config/technologies.config';
import { EN_TRANSLATIONS } from '../../../core/i18n/translations/en';
import { ES_TRANSLATIONS } from '../../../core/i18n/translations/es';

describe('HomePage sections', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  async function renderHome(url = '/en'): Promise<HTMLElement> {
    const harness = await RouterTestingHarness.create(url);
    await harness.fixture.whenStable();
    return harness.routeNativeElement as HTMLElement;
  }

  describe('About', () => {
    it('renders the real profile, not a placeholder', async () => {
      const element = await renderHome();
      const text = element.textContent ?? '';
      const about = EN_TRANSLATIONS.about;

      for (const paragraph of about.paragraphs) {
        expect(text).toContain(paragraph);
      }

      expect(text).toContain(about.education.degree);
      expect(text).toContain(about.education.institution);
      expect(text).toContain('Universidad Fidélitas');
    });

    it('lists the working principles', async () => {
      const element = await renderHome();
      const items = Array.from(element.querySelectorAll('.principles__item')).map((node) =>
        node.textContent?.trim(),
      );

      expect(items).toEqual([...EN_TRANSLATIONS.about.principles.items]);
    });

    it('renders in Spanish', async () => {
      const element = await renderHome('/es');

      expect(element.textContent).toContain(ES_TRANSLATIONS.about.paragraphs[0]);
      expect(element.textContent).toContain(ES_TRANSLATIONS.about.principles.items[0]);
    });

    it('states proficiency without bars or percentages', async () => {
      const element = await renderHome();

      expect(element.querySelector('progress')).toBeNull();
      expect(element.querySelector('meter')).toBeNull();
      expect(element.textContent).not.toMatch(/\d+\s?%/);
    });
  });

  describe('Toolkit', () => {
    it('names every technology in the marquee', async () => {
      const element = await renderHome();
      const track = element.querySelector('.marquee__track');
      const names = Array.from(track?.querySelectorAll('.marquee__name') ?? []).map((node) =>
        node.textContent?.trim(),
      );

      expect(track?.getAttribute('aria-label')).toBe(EN_TRANSLATIONS.toolkit.strip.label);
      expect(names).toEqual(TECHNOLOGIES.map((technology) => technology.name));
    });

    it('reads the technologies once even though the marquee shows them twice', async () => {
      const element = await renderHome();

      expect(element.querySelectorAll('.marquee__track').length).toBe(2);
      expect(element.querySelectorAll('.marquee__track[aria-hidden="true"]').length).toBe(1);
    });

    it('renders one card per skill, with an icon and a short line', async () => {
      const element = await renderHome();
      const cards = Array.from(element.querySelectorAll('.skills__card'));

      expect(cards.length).toBe(EN_TRANSLATIONS.toolkit.skills.length);

      for (const [index, skill] of EN_TRANSLATIONS.toolkit.skills.entries()) {
        const card = cards[index];
        expect(card.querySelector('.skills__title')?.textContent).toContain(skill.title);
        expect(card.querySelector('.skills__text')?.textContent).toContain(skill.description);
        expect(card.querySelector('svg'), skill.id).not.toBeNull();
      }
    });

    it('hides the decorative icons from assistive technology', async () => {
      const element = await renderHome();
      const icons = Array.from(element.querySelectorAll('.skills__icon'));

      expect(icons.every((icon) => icon.getAttribute('aria-hidden') === 'true')).toBe(true);
    });

    it('closes with a note that points back at the work', async () => {
      const element = await renderHome();
      const cta = element.querySelector('.toolkit__cta');

      expect(cta?.textContent).toContain(EN_TRANSLATIONS.toolkit.cta.title);
      expect(cta?.textContent).toContain(EN_TRANSLATIONS.toolkit.cta.action);
      expect(cta?.querySelector('a')?.getAttribute('href')).toBe('/en#projects');
    });

    it('translates the whole section', async () => {
      const element = await renderHome('/es');
      const text = element.textContent ?? '';
      const copy = ES_TRANSLATIONS.toolkit;

      expect(text).toContain(copy.title);
      expect(text).toContain(copy.technologiesLabel);
      expect(text).toContain(copy.skillsLabel);
      expect(text).toContain(copy.cta.action);
      for (const skill of copy.skills) {
        expect(text, skill.id).toContain(skill.title);
      }
    });
  });

  describe('Contact', () => {
    it('publishes the email and the résumé download', async () => {
      const element = await renderHome();

      expect(element.querySelector(`a[href="mailto:${CONTACT_CONFIG.email}"]`)).not.toBeNull();
      expect(element.querySelector(`a[href="${RESUME_CONFIG.path}"]`)).not.toBeNull();
      expect(element.textContent).toContain(EN_TRANSLATIONS.contact.message);
    });

    it('renders no social link while no URL is configured', async () => {
      const element = await renderHome();

      // Guards against shipping a dead link: the config has no LinkedIn or
      // GitHub URL, so neither anchor may exist.
      expect(CONTACT_CONFIG.linkedinUrl).toBeNull();
      expect(CONTACT_CONFIG.githubUrl).toBeNull();
      expect(element.querySelector('a[href*="linkedin"]')).toBeNull();
      expect(element.querySelector('a[href*="github"]')).toBeNull();
    });

    it('does not publish the phone number from the résumé', async () => {
      const element = await renderHome();

      expect(element.textContent).not.toMatch(/\+506/);
      expect(element.querySelector('a[href^="tel:"]')).toBeNull();
    });
  });

  describe('Selected work', () => {
    it('gives LuxuryCloud the case-study link and the other projects none', async () => {
      const element = await renderHome();
      const caseStudyLinks = element.querySelectorAll('a[href$="/projects/luxurycloud"]');

      expect(caseStudyLinks.length).toBe(1);
      expect(caseStudyLinks[0].textContent).toContain(EN_TRANSLATIONS.common.viewCaseStudy);
    });

    it('navigates to the case study', async () => {
      const harness = await RouterTestingHarness.create('/en');
      await harness.fixture.whenStable();

      const element = harness.routeNativeElement as HTMLElement;
      element.querySelector<HTMLAnchorElement>('a[href$="/projects/luxurycloud"]')?.click();
      await harness.fixture.whenStable();

      expect(TestBed.inject(Router).url).toBe('/en/projects/luxurycloud');
    });

    it('shows each project with its real status', async () => {
      const element = await renderHome();
      const text = element.textContent ?? '';
      const work = EN_TRANSLATIONS.work;

      expect(text).toContain(work.featured.status);
      expect(text).toContain(work.featured.role);

      for (const project of work.others) {
        expect(text).toContain(project.name);
        expect(text).toContain(project.status);
      }
    });

    it('gives a gallery to each project that has captures, and only those', async () => {
      const element = await renderHome();

      expect(element.querySelectorAll('app-screenshot-carousel').length).toBe(2);
      expect(element.querySelector('.featured__visual app-screenshot-carousel')).not.toBeNull();
      expect(element.querySelectorAll('.projects__visual app-screenshot-carousel').length).toBe(1);
    });

    it('hangs the second gallery from NexoPOS, not from PersonalOS', async () => {
      const element = await renderHome();
      const cards = Array.from(
        element.querySelectorAll('.projects__item:not(.projects__item--featured)'),
      );
      const withGallery = cards.filter((card) => card.querySelector('.projects__visual') !== null);

      expect(withGallery.length).toBe(1);
      expect(withGallery[0].textContent).toContain('NexoPOS');
    });

    it('opens on the financial dashboard, loaded eagerly as the page’s main image', async () => {
      const element = await renderHome();
      const [shot] = LUXURYCLOUD_SCREENSHOTS;

      expect(shot.id).toBe('dashboard');
      expect(shot.available).toBe(true);

      const image = element.querySelector<HTMLImageElement>('.featured__visual .shot__image');
      expect(image?.getAttribute('src')).toBe(shot.src);
      expect(image?.getAttribute('alt')).toBe(EN_TRANSLATIONS.screenshots.items.dashboard.alt);
      expect(image?.getAttribute('loading')).toBe('eager');
      // Intrinsic dimensions are what stop the lead image shifting the page.
      expect(image?.getAttribute('width')).toBe(String(shot.width));
      expect(image?.getAttribute('height')).toBe(String(shot.height));
    });

    it('loads the secondary gallery lazily: it is far below the fold', async () => {
      const element = await renderHome();

      expect(element.querySelector('.projects__visual .shot__image')?.getAttribute('loading')).toBe(
        'lazy',
      );
    });

    it('shows one capture at a time, with a dot per published capture', async () => {
      const element = await renderHome();
      const galleries = Array.from(element.querySelectorAll('app-screenshot-carousel'));
      const published = (gallery: ScreenshotGallery) =>
        gallery.filter((shot) => shot.available).length;

      expect(element.querySelectorAll('.shot__image').length).toBe(2);
      expect(galleries[0].querySelectorAll('.carousel__dot').length).toBe(
        published(PROJECT_GALLERIES.luxurycloud),
      );
      expect(galleries[1].querySelectorAll('.carousel__dot').length).toBe(
        published(PROJECT_GALLERIES.nexopos),
      );
    });

    it('renders no reserved slot: an unpublished capture is dropped, not framed', async () => {
      const element = await renderHome();

      expect(element.querySelector('.shot__slot')).toBeNull();
      expect(element.textContent).not.toContain(EN_TRANSLATIONS.screenshots.pending);
    });

    it('captions the visible capture of both galleries in English', async () => {
      const text = (await renderHome('/en')).textContent ?? '';

      expect(text).toContain(EN_TRANSLATIONS.screenshots.items.dashboard.caption);
      expect(text).toContain(EN_TRANSLATIONS.screenshots.items.overview.caption);
    });

    it('captions the visible capture of both galleries in Spanish', async () => {
      const text = (await renderHome('/es')).textContent ?? '';

      expect(text).toContain(ES_TRANSLATIONS.screenshots.items.dashboard.caption);
      expect(text).toContain(ES_TRANSLATIONS.screenshots.items.overview.caption);
    });
  });

  it('orders the sections to match the navigation', async () => {
    const element = await renderHome();
    const ids = Array.from(element.querySelectorAll('section[id]')).map((section) => section.id);

    expect(ids).toEqual(EN_TRANSLATIONS.nav.items.map((item) => item.id));
  });
});
