import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROJECT_GALLERIES } from '../../../core/config/screenshots.config';
import { localizedPath } from '../../../core/i18n/locale';
import { TranslationService } from '../../../core/i18n/translation.service';
import {
  CarouselSlide,
  ScreenshotCarousel,
} from '../../../shared/components/screenshot-carousel/screenshot-carousel';
import { ScreenshotGallery } from '../../../shared/models/screenshot';
import { CASE_STUDY_PATHS } from '../project.routes';

/**
 * Selected work.
 *
 * LuxuryCloud gets the top row and the only case-study link; NexoPOS and
 * PersonalOS share the row below. The hierarchy is the point: three identical
 * cards would claim the three are equivalent.
 *
 * Both galleries live here. They used to be scattered through the case study,
 * where they interrupted the argument; collected against their project they
 * read as a product tour, and the case study is left to the writing.
 */
@Component({
  selector: 'app-selected-work-section',
  imports: [RouterLink, ScreenshotCarousel],
  templateUrl: './selected-work-section.html',
  styleUrl: './selected-work-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedWorkSection {
  private readonly translations = inject(TranslationService);

  protected readonly t = this.translations.t;
  protected readonly copy = computed(() => this.translations.t().work);

  protected readonly luxurycloudSlides = this.slidesFor(PROJECT_GALLERIES.luxurycloud);
  protected readonly nexoposSlides = this.slidesFor(PROJECT_GALLERIES.nexopos);

  protected readonly caseStudyPath = computed(() =>
    localizedPath(this.translations.locale(), CASE_STUDY_PATHS.luxurycloud),
  );

  /** Looks up each capture's copy by id and drops the ones with no file yet. */
  private slidesFor(gallery: ScreenshotGallery) {
    return computed<readonly CarouselSlide[]>(() => {
      const items = this.translations.t().screenshots.items;

      return gallery
        .filter((asset) => asset.available)
        .map((asset) => ({
          asset,
          alt: items[asset.id].alt,
          caption: items[asset.id].caption,
        }));
    });
  }
}
