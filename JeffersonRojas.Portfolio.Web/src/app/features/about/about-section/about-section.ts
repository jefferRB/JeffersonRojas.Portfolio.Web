import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { TranslationService } from '../../../core/i18n/translation.service';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSection {
  private readonly translations = inject(TranslationService);

  protected readonly copy = computed(() => this.translations.t().about);
}
