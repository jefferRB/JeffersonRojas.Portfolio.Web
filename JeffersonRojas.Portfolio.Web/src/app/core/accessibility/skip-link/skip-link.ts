import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TranslationService } from '../../i18n/translation.service';

/** First focusable element on the page; jumps past the header to the content. */
@Component({
  selector: 'app-skip-link',
  templateUrl: './skip-link.html',
  styleUrl: './skip-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipLink {
  protected readonly t = inject(TranslationService).t;
}
