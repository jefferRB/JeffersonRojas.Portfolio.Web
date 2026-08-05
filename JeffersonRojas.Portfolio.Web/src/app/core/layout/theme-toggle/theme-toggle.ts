import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { TranslationService } from '../../i18n/translation.service';
import { ThemeService } from '../../theme/theme.service';

/**
 * Flips between the light and dark themes.
 *
 * State is carried by the icon *and* by the accessible name, so colour is never
 * the only indicator.
 */
@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);
  private readonly translations = inject(TranslationService);

  protected readonly theme = this.themeService.theme;

  protected readonly label = computed(() => {
    const a11y = this.translations.t().a11y;
    return this.theme() === 'dark' ? a11y.switchToLight : a11y.switchToDark;
  });

  protected toggle(): void {
    this.themeService.toggle();
  }
}
