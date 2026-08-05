import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { TranslationService } from '../../../core/i18n/translation.service';
import { SeoService } from '../../../core/seo/seo.service';
import { AboutSection } from '../../about/about-section/about-section';
import { ToolkitSection } from '../../about/toolkit-section/toolkit-section';
import { ContactSection } from '../../contact/contact-section/contact-section';
import { SelectedWorkSection } from '../../projects/selected-work-section/selected-work-section';
import { Hero } from '../sections/hero/hero';
import { WorkProcess } from '../sections/work-process/work-process';

@Component({
  selector: 'app-home-page',
  imports: [Hero, SelectedWorkSection, WorkProcess, AboutSection, ToolkitSection, ContactSection],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly translations = inject(TranslationService);
  private readonly seo = inject(SeoService);

  constructor() {
    // Re-applies title, description, canonical and hreflang whenever the
    // locale changes, without duplicating the page per language.
    effect(() => {
      const meta = this.translations.t().meta.home;

      this.seo.apply(this.translations.locale(), {
        title: meta.title,
        description: meta.description,
        path: '',
      });
    });
  }
}
