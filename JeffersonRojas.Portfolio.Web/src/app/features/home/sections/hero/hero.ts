import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CONTACT_CONFIG, RESUME_CONFIG } from '../../../../core/config/site.config';
import { localizedPath } from '../../../../core/i18n/locale';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { LinkedinMark } from '../../../../shared/components/linkedin-mark/linkedin-mark';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, LinkedinMark],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly translations = inject(TranslationService);

  protected readonly resume = RESUME_CONFIG;
  protected readonly contact = CONTACT_CONFIG;

  protected readonly t = this.translations.t;
  protected readonly copy = computed(() => this.translations.t().hero);
  protected readonly homePath = computed(() => localizedPath(this.translations.locale()));

  /** Accessible name for the résumé link, including the file format. */
  protected readonly resumeLabel = computed(() => {
    const common = this.translations.t().common;
    return `${common.downloadResume} (${common.resumeFormatLabel})`;
  });

  /** Says where the link goes and that it leaves the page. */
  protected readonly linkedinLabel = computed(() => {
    const t = this.translations.t();
    return `${t.common.linkedin} (${t.a11y.opensInNewTab})`;
  });
}
