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
import { CLIENT_DEMOS, CONTACT_CONFIG, RESUME_CONFIG } from '../../../core/config/site.config';
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
    function rows(element: HTMLElement): HTMLAnchorElement[] {
      return Array.from(element.querySelectorAll<HTMLAnchorElement>('.channels__link'));
    }

    it('offers exactly three channels: email, LinkedIn and the résumé', async () => {
      const element = await renderHome();
      const hrefs = rows(element).map((row) => row.getAttribute('href'));

      expect(hrefs).toEqual([
        `mailto:${CONTACT_CONFIG.email}`,
        CONTACT_CONFIG.linkedinUrl,
        RESUME_CONFIG.path,
      ]);
    });

    it('shows the statement and where I am, with no invented status', async () => {
      const element = await renderHome();
      const text = element.textContent ?? '';

      expect(text).toContain(EN_TRANSLATIONS.contact.message);
      expect(text).toContain(EN_TRANSLATIONS.contact.location);
      expect(text).not.toMatch(/available now|online now/i);
    });

    it('labels every row rather than leaving the icon to carry it', async () => {
      const element = await renderHome();
      const eyebrows = Array.from(element.querySelectorAll('.channels__eyebrow')).map((node) =>
        node.textContent?.trim(),
      );

      expect(eyebrows).toEqual([
        EN_TRANSLATIONS.contact.emailLabel,
        EN_TRANSLATIONS.contact.linkedinLabel,
        EN_TRANSLATIONS.common.downloadResume,
      ]);
    });

    it('makes the whole row the target, not just the value', async () => {
      const element = await renderHome();

      for (const row of rows(element)) {
        expect(row.querySelector('.channels__icon')).not.toBeNull();
        expect(row.querySelector('.channels__value')).not.toBeNull();
        expect(row.querySelector('.channels__arrow')).not.toBeNull();
      }
    });

    it('names the LinkedIn profile and keeps the résumé download attribute', async () => {
      const element = await renderHome();
      const [, linkedin, resume] = rows(element);

      expect(linkedin.textContent).toContain(CONTACT_CONFIG.linkedinName);
      expect(resume.hasAttribute('download')).toBe(true);
      expect(resume.textContent).toContain(EN_TRANSLATIONS.contact.resumeAction);
    });

    it('translates the whole section', async () => {
      const element = await renderHome('/es');
      const text = element.textContent ?? '';

      expect(text).toContain(ES_TRANSLATIONS.contact.message);
      expect(text).toContain(ES_TRANSLATIONS.contact.location);
      expect(text).toContain(ES_TRANSLATIONS.contact.emailLabel);
      expect(text).toContain(ES_TRANSLATIONS.contact.resumeAction);
    });

    it('renders no anchor for a channel that has no URL', async () => {
      const element = await renderHome();

      // GitHub is still unconfigured, and an unconfigured channel must produce
      // no link at all rather than an empty one.
      expect(CONTACT_CONFIG.githubUrl).toBeNull();
      expect(element.querySelector('a[href*="github"]')).toBeNull();
      expect(Array.from(element.querySelectorAll('a')).every((a) => a.getAttribute('href'))).toBe(
        true,
      );
    });

    it('does not publish the phone number from the résumé', async () => {
      const element = await renderHome();

      expect(element.textContent).not.toMatch(/\+506/);
      expect(element.querySelector('a[href^="tel:"]')).toBeNull();
    });
  });

  describe('LinkedIn', () => {
    function linkedinLinks(element: HTMLElement): HTMLAnchorElement[] {
      return Array.from(
        element.querySelectorAll<HTMLAnchorElement>(`a[href="${CONTACT_CONFIG.linkedinUrl}"]`),
      );
    }

    it('offers the profile as the hero’s third action', async () => {
      const element = await renderHome();
      const actions = Array.from(element.querySelectorAll('.hero__actions > *'));

      expect(actions.length).toBe(3);
      expect(actions[0].textContent).toContain(EN_TRANSLATIONS.hero.actions.viewWork);
      expect(actions[1].textContent).toContain(EN_TRANSLATIONS.common.downloadResume);
      expect(actions[2].textContent).toContain(EN_TRANSLATIONS.common.linkedin);
      expect(actions[2].getAttribute('href')).toBe(CONTACT_CONFIG.linkedinUrl);
    });

    it('no longer offers a contact link as a hero action', async () => {
      const element = await renderHome();
      const actions = element.querySelector('.hero__actions');

      expect(actions?.querySelector('a[href$="#contact"]')).toBeNull();
      expect(actions?.textContent).not.toMatch(/contact me/i);
    });

    it('reads the URL from configuration in every place that links to it', async () => {
      const element = await renderHome();

      // Hero, contact row and footer: three links, one source.
      expect(linkedinLinks(element).length).toBeGreaterThanOrEqual(2);
      expect(CONTACT_CONFIG.linkedinUrl).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
    });

    it('opens in a new tab without handing over the opener', async () => {
      const element = await renderHome();

      for (const link of linkedinLinks(element)) {
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      }
    });

    it('names each link and says it leaves the page', async () => {
      const element = await renderHome();

      for (const link of linkedinLinks(element)) {
        const name = link.getAttribute('aria-label') ?? '';
        expect(name).toContain(EN_TRANSLATIONS.common.linkedin);
        expect(name).toContain(EN_TRANSLATIONS.a11y.opensInNewTab);
      }
    });

    it('draws the mark inline and hides it from assistive technology', async () => {
      const element = await renderHome();

      for (const link of linkedinLinks(element)) {
        const svg = link.querySelector('app-linkedin-mark svg');
        expect(svg).not.toBeNull();
        expect(svg?.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('keeps the word beside the mark, in both languages', async () => {
      for (const [url, dictionary] of [
        ['/en', EN_TRANSLATIONS],
        ['/es', ES_TRANSLATIONS],
      ] as const) {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({ providers: [provideRouter(routes)] });

        const element = await renderHome(url);
        for (const link of linkedinLinks(element)) {
          expect(link.textContent, url).toContain(dictionary.common.linkedin);
        }
      }
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

    describe('the recorded client demo', () => {
      function demoLink(element: HTMLElement): HTMLAnchorElement | null {
        return element.querySelector<HTMLAnchorElement>('.featured__demo');
      }

      it('is offered on LuxuryCloud and on no other card', async () => {
        const element = await renderHome();

        expect(element.querySelectorAll('.featured__demo').length).toBe(1);
        expect(demoLink(element)?.getAttribute('href')).toBe(CLIENT_DEMOS.luxurycloud.watchUrl);
        expect(demoLink(element)?.textContent).toContain(EN_TRANSLATIONS.work.featured.demo.label);
      });

      it('stays secondary to the case study, which keeps the primary action', async () => {
        const element = await renderHome();
        const actions = Array.from(element.querySelectorAll('.featured__actions > a'));

        // Order is the hierarchy: the case study is read first, by everyone.
        expect(actions.length).toBe(2);
        expect(actions[0].textContent).toContain(EN_TRANSLATIONS.common.viewCaseStudy);
        expect(actions[0].classList.contains('action-link')).toBe(true);
        expect(actions[1].classList.contains('action-link')).toBe(false);
      });

      it('opens in a new tab without handing over the opener', async () => {
        const element = await renderHome();

        expect(demoLink(element)?.getAttribute('target')).toBe('_blank');
        expect(demoLink(element)?.getAttribute('rel')).toBe('noopener noreferrer');
      });

      it('says where it goes and that the tab is new', async () => {
        const element = await renderHome();
        const name = demoLink(element)?.getAttribute('aria-label') ?? '';

        expect(name).toContain('YouTube');
        expect(name).toContain(EN_TRANSLATIONS.a11y.opensInNewTab);
      });

      it('embeds nothing in the card itself', async () => {
        const element = await renderHome();

        expect(element.querySelector('iframe')).toBeNull();
      });

      it('translates both the label and its accessible name', async () => {
        const element = await renderHome('/es');
        const copy = ES_TRANSLATIONS.work.featured.demo;

        expect(demoLink(element)?.textContent).toContain(copy.label);
        expect(demoLink(element)?.getAttribute('aria-label')).toBe(copy.ariaLabel);
      });
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
