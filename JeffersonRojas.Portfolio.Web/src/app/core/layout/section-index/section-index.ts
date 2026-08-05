import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  CASE_SECTION_IDS,
  CaseSectionId,
  SECTION_IDS,
  SectionId,
} from '../../../shared/models/section';
import { createActiveSectionSignal } from '../../../shared/utilities/active-section';
import { createMediaQuerySignal } from '../../../shared/utilities/media-query';
import { LocaleService } from '../../i18n/locale.service';
import { TranslationService } from '../../i18n/translation.service';
import { CaseStudyContext } from '../case-study-context';

/** Matches $bp-lg: at or above this the index shows its labels permanently. */
const EXPANDED_QUERY = '(min-width: 64rem)';

/**
 * A narrow floating index of the sections on the current page.
 *
 * It repeats the shape of the hero pipeline on purpose — a vertical line with a
 * node per stop — so the reader recognises it as the same idea applied to the
 * document, rather than as an application menu.
 *
 * The active section is reported by IntersectionObserver, but nothing depends
 * on it: every entry is an ordinary fragment link, so the index still navigates
 * when the observer is unavailable. Only the highlight is lost.
 *
 * On a case-study route the list is replaced by that document's own outline,
 * so the reader never sees two competing navigations.
 */
@Component({
  selector: 'app-section-index',
  imports: [RouterLink],
  templateUrl: './section-index.html',
  styleUrl: './section-index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionIndex {
  private readonly translations = inject(TranslationService);
  private readonly localeService = inject(LocaleService);
  private readonly caseStudy = inject(CaseStudyContext);
  private readonly isExpanded = createMediaQuerySignal(EXPANDED_QUERY);

  // Both observers are created once. Only the ids present in the DOM are
  // observed, so the inactive one simply never reports.
  private readonly activeSection = createActiveSectionSignal<SectionId>(SECTION_IDS);
  private readonly activeCaseSection = createActiveSectionSignal<CaseSectionId>(CASE_SECTION_IDS);

  private readonly open = signal(false);

  protected readonly t = this.translations.t;
  protected readonly isOpen = this.open.asReadonly();

  protected readonly items = computed(() =>
    this.caseStudy.isActive() ? this.t().nav.caseItems : this.t().nav.items,
  );

  protected readonly navLabel = computed(() =>
    this.caseStudy.isActive() ? this.t().nav.caseNavLabel : this.t().nav.primaryLabel,
  );

  /** The current path, so fragment links stay on the page they belong to. */
  protected readonly basePath = computed(() => {
    const url = this.localeService.url();
    return url.split('#')[0].split('?')[0];
  });

  protected readonly active = computed<string | null>(() =>
    this.caseStudy.isActive() ? this.activeCaseSection() : this.activeSection(),
  );

  constructor() {
    // Growing past the breakpoint reveals the list anyway, so leaving the
    // collapsed state open would strand `aria-expanded` on a hidden trigger.
    effect(() => {
      if (this.isExpanded()) {
        this.open.set(false);
      }
    });
  }

  protected toggle(): void {
    this.open.update((open) => !open);
  }

  protected close(): void {
    this.open.set(false);
  }
}
