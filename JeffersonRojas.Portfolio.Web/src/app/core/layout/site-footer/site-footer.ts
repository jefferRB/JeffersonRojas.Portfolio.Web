import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { localizedPath } from '../../i18n/locale';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  private readonly translations = inject(TranslationService);

  protected readonly t = this.translations.t;
  protected readonly homePath = computed(() => localizedPath(this.translations.locale()));
  protected readonly year = new Date().getFullYear();
}
