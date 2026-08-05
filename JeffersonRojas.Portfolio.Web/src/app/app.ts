import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LiveAnnouncerService } from './core/accessibility/live-announcer.service';
import { SkipLink } from './core/accessibility/skip-link/skip-link';
import { Locale } from './core/i18n/locale';
import { TranslationService } from './core/i18n/translation.service';
import { SectionIndex } from './core/layout/section-index/section-index';
import { SiteFooter } from './core/layout/site-footer/site-footer';
import { ViewControls } from './core/layout/view-controls/view-controls';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SkipLink, ViewControls, SectionIndex, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly translations = inject(TranslationService);
  private readonly announcer = inject(LiveAnnouncerService);

  protected readonly announcement = this.announcer.message;

  constructor() {
    // Instantiated at the root so the theme is applied and kept in sync for the
    // whole session, independently of which component is rendered.
    inject(ThemeService);

    let previous: Locale | null = null;

    effect(() => {
      const locale = this.translations.locale();
      const message = this.translations.t().a11y.languageChanged;

      // Skipped on first run: the initial language is not a change.
      if (previous !== null && previous !== locale) {
        this.announcer.announce(message);
      }

      previous = locale;
    });
  }
}
