import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';

import { TranslationService } from '../../../core/i18n/translation.service';
import { ScreenshotAsset } from '../../models/screenshot';
import { Screenshot } from '../screenshot/screenshot';

/** One capture with the copy that describes it. */
export interface CarouselSlide {
  readonly asset: ScreenshotAsset;
  readonly alt: string;
  readonly caption: string;
}

/**
 * A gallery of product screenshots showing one capture at a time.
 *
 * Deliberately plain: no library, no auto-advance, no motion on the swap. The
 * captures are dense interface screenshots, and anything that slides or fades
 * them reads as marketing rather than as evidence.
 *
 * Three things are worth knowing about the implementation:
 *
 * - The visible slide is a single `app-screenshot`, so the figure semantics,
 *   the intrinsic sizing and the enlarge dialog are the ones already tested
 *   there rather than a second copy of them.
 * - Only the neighbouring captures are preloaded. Rendering all of them would
 *   pull the whole gallery over the wire on first paint for one visible image.
 * - Movement wraps at both ends. Disabling an arrow at the edge would drop
 *   keyboard focus in the middle of a sequence of presses.
 */
@Component({
  selector: 'app-screenshot-carousel',
  imports: [Screenshot],
  templateUrl: './screenshot-carousel.html',
  styleUrl: './screenshot-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenshotCarousel {
  readonly slides = input.required<readonly CarouselSlide[]>();
  /** Accessible name for the gallery as a whole, e.g. the product name. */
  readonly label = input.required<string>();
  /** True when this gallery holds the page's lead image. */
  readonly priority = input(false);

  private readonly indexState = signal(0);

  protected readonly t = inject(TranslationService).t;
  protected readonly copy = computed(() => this.t().screenshots.carousel);
  protected readonly index = this.indexState.asReadonly();
  protected readonly count = computed(() => this.slides().length);

  protected readonly active = computed(() => this.slides()[this.index()]);

  /**
   * The captures either side of the visible one, kept in the HTTP cache so a
   * press of an arrow paints immediately instead of blanking the frame.
   */
  protected readonly preloadSources = computed(() => {
    const slides = this.slides();

    if (slides.length < 2) {
      return [];
    }

    const previous = this.wrap(this.index() - 1);
    const next = this.wrap(this.index() + 1);

    return [...new Set([slides[previous].asset.src, slides[next].asset.src])].filter(
      (src) => src !== this.active().asset.src,
    );
  });

  /** Announced on change: position first, then what the capture shows. */
  protected readonly liveMessage = computed(() => `${this.position()}. ${this.active().caption}`);

  protected position(): string {
    return this.copy()
      .position.replace('{current}', String(this.index() + 1))
      .replace('{total}', String(this.count()));
  }

  protected dotLabel(index: number): string {
    return this.copy().goTo.replace('{n}', String(index + 1));
  }

  protected goTo(index: number): void {
    this.indexState.set(this.wrap(index));
  }

  protected previous(): void {
    this.goTo(this.index() - 1);
  }

  protected next(): void {
    this.goTo(this.index() + 1);
  }

  /**
   * Arrow keys move the gallery while focus is anywhere inside it, which is
   * what a reader who has just tabbed to the previous button expects.
   */
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }

  private wrap(index: number): number {
    const count = this.count();

    if (count === 0) {
      return 0;
    }

    return ((index % count) + count) % count;
  }
}
