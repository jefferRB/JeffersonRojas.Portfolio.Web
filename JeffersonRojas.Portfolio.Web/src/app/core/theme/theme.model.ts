/** What the reader asked for. `system` defers to `prefers-color-scheme`. */
export type ThemePreference = 'system' | 'light' | 'dark';

/** What actually gets painted. */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Storage key for the persisted preference.
 * Kept in sync with the inline bootstrap script in src/index.html, which must
 * read the same key before Angular boots to avoid a theme flash.
 */
export const THEME_STORAGE_KEY = 'jr-portfolio-theme';

export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

const PREFERENCES: readonly ThemePreference[] = ['system', 'light', 'dark'];

/** Narrows arbitrary persisted input to a known preference, defaulting to `system`. */
export function toThemePreference(value: string | null): ThemePreference {
  return PREFERENCES.find((preference) => preference === value) ?? 'system';
}
