import { Injectable, Signal, computed, inject } from '@angular/core';

import { LocaleService } from './locale.service';
import { TRANSLATIONS } from './translations';
import { Translations } from './translations/translations.model';

/**
 * Exposes the copy for the active locale.
 *
 * Components read `t().section.key` — one reactive, fully typed entry point,
 * so no component is duplicated per language and no literal strings end up in
 * templates.
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly localeService = inject(LocaleService);

  readonly locale = this.localeService.locale;

  readonly t: Signal<Translations> = computed(() => TRANSLATIONS[this.locale()]);
}
