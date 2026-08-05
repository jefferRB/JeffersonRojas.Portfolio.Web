import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { localizedPath } from '../../../core/i18n/locale';
import { TranslationService } from '../../../core/i18n/translation.service';
import { TechStrip } from '../tech-strip/tech-strip';

/**
 * Engineering toolkit.
 *
 * Two answers to two different questions: what I build with (the technology
 * strip) and what I bring to it (the skills grid). They are separate because
 * one is a list of proper nouns that dates quickly, and the other is the part
 * that carries over between stacks.
 *
 * Still no proficiency bars, percentages or years: those invent a precision
 * that does not exist.
 */
@Component({
  selector: 'app-toolkit-section',
  imports: [RouterLink, TechStrip],
  templateUrl: './toolkit-section.html',
  styleUrl: './toolkit-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolkitSection {
  private readonly translations = inject(TranslationService);

  protected readonly copy = computed(() => this.translations.t().toolkit);
  protected readonly homePath = computed(() => localizedPath(this.translations.locale()));
}
