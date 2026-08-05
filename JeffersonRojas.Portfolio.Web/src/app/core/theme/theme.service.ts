import { DOCUMENT, Injectable, Signal, computed, effect, inject, signal } from '@angular/core';

import {
  injectLocalStorage,
  readStoredString,
  removeStoredString,
  writeStoredString,
} from '../../shared/utilities/browser-storage';
import { createMediaQuerySignal } from '../../shared/utilities/media-query';
import {
  DARK_SCHEME_QUERY,
  ResolvedTheme,
  THEME_STORAGE_KEY,
  ThemePreference,
  toThemePreference,
} from './theme.model';

/**
 * Resolves and applies the colour theme.
 *
 * Three internal preferences (`system` | `light` | `dark`); the visible control
 * only toggles between light and dark, but the service starts from the system
 * setting until the reader states otherwise. All browser access is guarded so
 * the service is safe under prerendering.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storage = injectLocalStorage();
  private readonly systemPrefersDark = createMediaQuerySignal(DARK_SCHEME_QUERY);

  private readonly preferenceState = signal<ThemePreference>(
    toThemePreference(readStoredString(this.storage, THEME_STORAGE_KEY)),
  );

  /** The stored intent, including `system`. */
  readonly preference: Signal<ThemePreference> = this.preferenceState.asReadonly();

  /** The theme actually in effect. */
  readonly theme: Signal<ResolvedTheme> = computed(() => {
    const preference = this.preferenceState();

    if (preference !== 'system') {
      return preference;
    }

    return this.systemPrefersDark() ? 'dark' : 'light';
  });

  constructor() {
    effect(() => this.applyTheme(this.theme()));
  }

  setPreference(preference: ThemePreference): void {
    this.preferenceState.set(preference);

    if (preference === 'system') {
      // Removing the key lets the bootstrap script fall back to the media query.
      removeStoredString(this.storage, THEME_STORAGE_KEY);
      return;
    }

    writeStoredString(this.storage, THEME_STORAGE_KEY, preference);
  }

  /** Flips between light and dark, starting from whatever is currently painted. */
  toggle(): void {
    this.setPreference(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(theme: ResolvedTheme): void {
    const root = this.document.documentElement;
    root.dataset['theme'] = theme;
    root.style.colorScheme = theme;
  }
}
