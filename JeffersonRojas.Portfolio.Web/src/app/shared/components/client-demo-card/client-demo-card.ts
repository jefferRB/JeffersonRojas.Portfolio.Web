import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { TranslationService } from '../../../core/i18n/translation.service';

/** Privacy-enhanced host: nothing is written to YouTube's cookie jar. */
const EMBED_ORIGIN = 'https://www.youtube-nocookie.com/embed/';
const THUMBNAIL_ORIGIN = 'https://i.ytimg.com/vi/';

/**
 * A YouTube id and nothing else. The id is interpolated into a resource URL the
 * sanitizer is told to trust, so it is checked against the shape YouTube
 * actually issues rather than taken on faith from an input.
 */
const VIDEO_ID_PATTERN = /^[\w-]{6,24}$/;

/**
 * A recorded demo, presented as a still frame with the copy that explains it.
 *
 * The point of the component is what it does *not* do on load: no iframe, no
 * player script, no request to YouTube at all. Only the thumbnail is fetched,
 * lazily, and the embed is mounted after the reader asks for it — and unmounted
 * again when they close it, so a closed player is not left running in the
 * background.
 *
 * Playback uses the native `<dialog>`, the same element the screenshot enlarger
 * already relies on, which supplies the focus trap, Escape handling and
 * background inerting itself. Focus restoration is done explicitly as well: the
 * card has two triggers, and the reader has to land back on the one they used.
 *
 * Thumbnails: `maxresdefault` does not exist for every upload, so a failed load
 * falls back to `hqdefault`, which always does.
 */
@Component({
  selector: 'app-client-demo-card',
  templateUrl: './client-demo-card.html',
  styleUrl: './client-demo-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDemoCard {
  readonly videoId = input.required<string>();
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly actionLabel = input.required<string>();
  readonly thumbnailAlt = input.required<string>();

  /** Overrides for the still frame. Both default to YouTube's own stills. */
  readonly thumbnailUrl = input<string | null>(null);
  readonly fallbackThumbnailUrl = input<string | null>(null);

  private readonly document = inject(DOCUMENT);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  private readonly open = signal(false);
  private readonly thumbnailFailed = signal(false);

  /** The control that opened the player, so focus can be handed back to it. */
  private trigger: HTMLElement | null = null;

  protected readonly t = inject(TranslationService).t;
  protected readonly isOpen = this.open.asReadonly();

  protected readonly thumbnailSrc = computed(() =>
    this.thumbnailFailed()
      ? (this.fallbackThumbnailUrl() ?? `${THUMBNAIL_ORIGIN}${this.videoId()}/hqdefault.jpg`)
      : (this.thumbnailUrl() ?? `${THUMBNAIL_ORIGIN}${this.videoId()}/maxresdefault.jpg`),
  );

  protected readonly playLabel = computed(() =>
    this.t().videoDemo.play.replace('{title}', this.title()),
  );

  /**
   * Autoplay is in the URL and in `allow`, which is safe precisely because the
   * frame is only ever created inside the click that asked for playback.
   */
  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.videoId();

    if (!VIDEO_ID_PATTERN.test(id)) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`${EMBED_ORIGIN}${id}?autoplay=1&rel=0`);
  });

  constructor() {
    // A page left mid-playback must not leave the document unscrollable. Only
    // when this card actually holds the lock: releasing one it never took would
    // be this component reaching outside itself.
    inject(DestroyRef).onDestroy(() => {
      if (this.open()) {
        this.unlockScroll();
      }
    });
  }

  protected onThumbnailError(): void {
    this.thumbnailFailed.set(true);
  }

  protected openPlayer(event: Event): void {
    const dialog = this.dialogRef()?.nativeElement;

    if (!dialog) {
      return;
    }

    this.trigger = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    this.open.set(true);
    this.lockScroll();

    // jsdom implements the element but not always the modal method.
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  protected close(): void {
    const dialog = this.dialogRef()?.nativeElement;

    if (dialog?.open === true) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }

    // Torn down here rather than left to the queued `close` event: a control the
    // reader pressed must release the page in the same breath. The teardown is
    // idempotent, so the event arriving afterwards costs nothing.
    this.onDialogClose();
  }

  /** Escape, the backdrop and the close button all arrive here, once or twice. */
  protected onDialogClose(): void {
    this.open.set(false);
    this.unlockScroll();

    this.trigger?.focus();
    this.trigger = null;
  }

  /** A click landing on the dialog itself rather than its panel is a backdrop click. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialogRef()?.nativeElement) {
      this.close();
    }
  }

  private lockScroll(): void {
    this.document.documentElement.style.setProperty('overflow', 'hidden');
  }

  private unlockScroll(): void {
    this.document.documentElement.style.removeProperty('overflow');
  }
}
