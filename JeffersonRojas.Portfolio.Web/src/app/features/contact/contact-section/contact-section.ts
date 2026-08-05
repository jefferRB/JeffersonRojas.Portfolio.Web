import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { CONTACT_CONFIG, RESUME_CONFIG } from '../../../core/config/site.config';
import { TranslationService } from '../../../core/i18n/translation.service';

/**
 * Contact.
 *
 * Only channels that exist are rendered: a `null` URL in the config produces no
 * link at all rather than a dead one. The phone number from the résumé is
 * deliberately not published here.
 */
@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSection {
  private readonly translations = inject(TranslationService);

  protected readonly contact = CONTACT_CONFIG;
  protected readonly resume = RESUME_CONFIG;

  protected readonly t = this.translations.t;
  protected readonly copy = computed(() => this.translations.t().contact);

  protected readonly resumeLabel = computed(() => {
    const common = this.translations.t().common;
    return `${common.downloadResume} (${common.resumeFormatLabel})`;
  });
}
