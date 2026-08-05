import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, PLATFORM_ID, inject } from '@angular/core';

/**
 * Resolves `localStorage` when it is genuinely usable.
 *
 * Returns `null` on the server and in browsers where storage access throws
 * (private mode, blocked third-party storage, disabled cookies). Must be called
 * from an injection context.
 */
export function injectLocalStorage(): Storage | null {
  const platformId = inject(PLATFORM_ID);
  const view = inject(DOCUMENT).defaultView;

  if (!isPlatformBrowser(platformId) || view === null) {
    return null;
  }

  try {
    return view.localStorage;
  } catch {
    // Accessing the property itself can throw when storage is blocked.
    return null;
  }
}

export function readStoredString(storage: Storage | null, key: string): string | null {
  if (storage === null) {
    return null;
  }

  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStoredString(storage: Storage | null, key: string, value: string): void {
  if (storage === null) {
    return;
  }

  try {
    storage.setItem(key, value);
  } catch {
    // Quota exceeded or storage disabled: the preference simply is not persisted.
  }
}

export function removeStoredString(storage: Storage | null, key: string): void {
  if (storage === null) {
    return;
  }

  try {
    storage.removeItem(key);
  } catch {
    // Nothing to recover from; the value stays as it was.
  }
}
