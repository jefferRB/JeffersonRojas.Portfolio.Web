import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SUPPORTED_LOCALES, Locale } from '../../i18n/locale';
import { LocaleService } from '../../i18n/locale.service';
import { TranslationService } from '../../i18n/translation.service';

/**
 * EN / ES switch.
 *
 * Rendered as real anchors pointing at the localised URL, so the control works
 * without JavaScript, is crawlable, and supports open-in-new-tab. The click
 * handler upgrades it to a client-side navigation that preserves the fragment.
 */
@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
  private readonly localeService = inject(LocaleService);

  protected readonly locales = SUPPORTED_LOCALES;
  protected readonly locale = this.localeService.locale;
  protected readonly t = inject(TranslationService).t;

  protected href(target: Locale): string {
    return this.localeService.urlForLocale(target);
  }

  protected select(event: MouseEvent, target: Locale): void {
    // Leave modified clicks to the browser so "open in new tab" keeps working.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    void this.localeService.switchTo(target);
  }
}
