import { isPlatformBrowser } from '@angular/common';
import {
  DOCUMENT,
  DestroyRef,
  PLATFORM_ID,
  Signal,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

/**
 * Tracks which section is currently in view.
 *
 * Uses IntersectionObserver rather than a scroll listener, so nothing runs on
 * the main thread per scroll frame. Returns `null` when the API is unavailable
 * or on the server: the links are ordinary anchors and keep working either way,
 * only the highlight is lost.
 *
 * The sections it watches belong to a routed page, so they appear after this
 * runs and are replaced wholesale on every navigation. A single pass at startup
 * would therefore observe the first page's elements and then keep reporting on
 * detached nodes forever; instead the targets are re-resolved whenever the
 * document changes.
 *
 * Must be called from an injection context.
 */
export function createActiveSectionSignal<T extends string>(
  ids: readonly T[],
  options: { readonly topOffsetPx: number } = { topOffsetPx: 96 },
): Signal<T | null> {
  const platformId = inject(PLATFORM_ID);
  const document = inject(DOCUMENT);
  const view = document.defaultView;
  const active = signal<T | null>(null);

  if (!isPlatformBrowser(platformId) || typeof view?.IntersectionObserver !== 'function') {
    return active.asReadonly();
  }

  const visible = new Map<T, number>();

  const observer = new view.IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id as T;

        if (entry.isIntersecting) {
          visible.set(id, entry.boundingClientRect.top);
        } else {
          visible.delete(id);
        }
      }

      if (visible.size === 0) {
        return;
      }

      // When several sections are on screen, the highest one wins: that is the
      // heading the reader has most recently passed.
      const [topMost] = [...visible.entries()].sort((a, b) => a[1] - b[1]);
      active.set(topMost[0]);
    },
    {
      // Shrinks the viewport from the top so a section only counts as active
      // once it has cleared the floating chrome.
      rootMargin: `-${options.topOffsetPx}px 0px -55% 0px`,
      threshold: 0,
    },
  );

  /** Currently observed element per id, so a swap can be detected. */
  const watched = new Map<T, Element>();

  const sync = (): void => {
    for (const id of ids) {
      const element = document.getElementById(id);
      const previous = watched.get(id);

      if (previous === (element ?? undefined)) {
        continue;
      }

      if (previous !== undefined) {
        observer.unobserve(previous);
        watched.delete(id);
        visible.delete(id);
      }

      if (element !== null) {
        observer.observe(element);
        watched.set(id, element);
      }
    }

    // Every watched section left the document at once: a navigation, not a
    // scroll. Dropping the highlight avoids carrying it onto the next page.
    if (watched.size === 0 && active() !== null) {
      active.set(null);
    }
  };

  const destroyRef = inject(DestroyRef);
  let mutations: MutationObserver | null = null;

  afterNextRender(() => {
    sync();

    // Cheap: the callback is batched per microtask and only does a handful of
    // `getElementById` lookups, which is what makes watching the whole body
    // affordable compared with wiring this to the router.
    mutations = new view.MutationObserver(sync);
    mutations.observe(document.body, { childList: true, subtree: true });
  });

  destroyRef.onDestroy(() => {
    observer.disconnect();
    mutations?.disconnect();
  });

  return active.asReadonly();
}
