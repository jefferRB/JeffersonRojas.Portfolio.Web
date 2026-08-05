import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

/**
 * Language and theme, pinned to the top-right corner at every viewport size.
 *
 * Deliberately not a full-width bar: these two controls are the only permanent
 * chrome the page needs, and a bar would claim a band of vertical space on
 * every screen to carry them. A small translucent cluster stays reachable
 * without ever competing with the content underneath.
 */
@Component({
  selector: 'app-view-controls',
  imports: [LanguageSwitcher, ThemeToggle],
  templateUrl: './view-controls.html',
  styleUrl: './view-controls.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewControls {}
