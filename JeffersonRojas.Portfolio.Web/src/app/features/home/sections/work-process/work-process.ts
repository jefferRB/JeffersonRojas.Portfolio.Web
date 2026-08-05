import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';

import { TranslationService } from '../../../../core/i18n/translation.service';

/**
 * "From problem to product" — the four delivery stages.
 *
 * Every stage description is always present in the DOM, so the section is fully
 * readable with JavaScript, CSS animations or both unavailable. Selecting a
 * stage only *emphasises* it: it fills the progress rail up to that point and
 * raises its surface. Nothing is revealed or hidden, which is what keeps the
 * layout from jumping.
 *
 * Activation happens on click, on focus and on arrow keys — never on hover
 * alone. It is not a carousel: nothing advances by itself.
 */
@Component({
  selector: 'app-work-process',
  templateUrl: './work-process.html',
  styleUrl: './work-process.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkProcess {
  private readonly translations = inject(TranslationService);
  private readonly stageButtons = viewChildren<ElementRef<HTMLButtonElement>>('stageButton');

  private readonly activeIndex = signal(0);

  protected readonly copy = computed(() => this.translations.t().process);
  protected readonly stages = computed(() => this.copy().stages);
  protected readonly active = this.activeIndex.asReadonly();

  protected select(index: number): void {
    this.activeIndex.set(index);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const lastIndex = this.stages().length - 1;
    let target: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        target = index === lastIndex ? 0 : index + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        target = index === 0 ? lastIndex : index - 1;
        break;
      case 'Home':
        target = 0;
        break;
      case 'End':
        target = lastIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    // Moving focus also selects, because the buttons activate on focus.
    this.stageButtons()[target]?.nativeElement.focus();
  }
}
