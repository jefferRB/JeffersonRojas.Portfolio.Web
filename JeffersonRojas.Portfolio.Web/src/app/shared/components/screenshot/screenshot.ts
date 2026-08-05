import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { TranslationService } from '../../../core/i18n/translation.service';
import { ScreenshotAsset } from '../../models/screenshot';

/**
 * A product screenshot presented as a figure.
 *
 * Two behaviours worth knowing:
 *
 * - When the asset is not `available` it renders a labelled empty slot instead
 *   of a broken image. Several captures contain client names and staff phone
 *   numbers and cannot be published until sanitised.
 * - Enlargement uses the native `<dialog>` element, which supplies the focus
 *   trap, Escape handling, background inerting and focus restoration itself.
 *   The enlarged image is only rendered while the dialog is open, so a closed
 *   dialog never costs a second download.
 */
@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.html',
  styleUrl: './screenshot.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Screenshot {
  readonly asset = input.required<ScreenshotAsset>();
  readonly alt = input.required<string>();
  readonly caption = input.required<string>();
  /** The first screenshot on a page loads eagerly; the rest stay lazy. */
  readonly priority = input(false);

  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  private readonly open = signal(false);

  protected readonly t = inject(TranslationService).t;
  protected readonly isOpen = this.open.asReadonly();
  protected readonly aspectRatio = computed(() => `${this.asset().width} / ${this.asset().height}`);

  protected enlarge(): void {
    const dialog = this.dialogRef()?.nativeElement;

    if (!dialog) {
      return;
    }

    this.open.set(true);

    // jsdom implements the element but not always the modal method.
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  protected close(): void {
    const dialog = this.dialogRef()?.nativeElement;
    this.open.set(false);

    if (dialog?.open === true) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }
  }

  /** Escape and the backdrop both route through the dialog's own close event. */
  protected onDialogClose(): void {
    this.open.set(false);
  }

  /** A click landing on the dialog itself rather than its contents is a backdrop click. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialogRef()?.nativeElement) {
      this.close();
    }
  }
}
