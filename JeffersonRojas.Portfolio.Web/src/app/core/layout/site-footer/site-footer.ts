import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CONTACT_CONFIG } from '../../config/site.config';
import { localizedPath } from '../../i18n/locale';
import { TranslationService } from '../../i18n/translation.service';
import { LinkedinMark } from '../../../shared/components/linkedin-mark/linkedin-mark';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, LinkedinMark],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  private readonly translations = inject(TranslationService);

  protected readonly contact = CONTACT_CONFIG;

  protected readonly t = this.translations.t;
  protected readonly homePath = computed(() => localizedPath(this.translations.locale()));
  protected readonly year = new Date().getFullYear();

  protected readonly linkedinLabel = computed(() => {
    const t = this.translations.t();
    return `${t.common.linkedin} (${t.a11y.opensInNewTab})`;
  });
}
