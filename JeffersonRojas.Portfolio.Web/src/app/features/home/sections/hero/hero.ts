import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RESUME_CONFIG } from '../../../../core/config/site.config';
import { localizedPath } from '../../../../core/i18n/locale';
import { TranslationService } from '../../../../core/i18n/translation.service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly translations = inject(TranslationService);

  protected readonly resume = RESUME_CONFIG;

  protected readonly t = this.translations.t;
  protected readonly copy = computed(() => this.translations.t().hero);
  protected readonly homePath = computed(() => localizedPath(this.translations.locale()));

  /** Accessible name for the résumé link, including the file format. */
  protected readonly resumeLabel = computed(() => {
    const common = this.translations.t().common;
    return `${common.downloadResume} (${common.resumeFormatLabel})`;
  });
}
