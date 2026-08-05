import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { THEME_STORAGE_KEY } from './theme.model';
import { ThemeService } from './theme.service';

const originalMatchMedia = window.matchMedia;
const originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(window, 'localStorage');

/** Replaces matchMedia so the system colour-scheme preference is controllable. */
function stubSystemPrefersDark(prefersDark: boolean): void {
  window.matchMedia = ((query: string) =>
    ({
      matches: prefersDark,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }) as unknown as MediaQueryList) as typeof window.matchMedia;
}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    stubSystemPrefersDark(false);
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;

    if (originalLocalStorageDescriptor !== undefined) {
      Object.defineProperty(window, 'localStorage', originalLocalStorageDescriptor);
    }

    localStorage.clear();
  });

  it('starts from the system preference', () => {
    stubSystemPrefersDark(true);

    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('system');
    expect(service.theme()).toBe('dark');
  });

  it('resolves to light when the system does not prefer dark', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('light');
  });

  it('lets an explicit preference win over the system setting', () => {
    stubSystemPrefersDark(true);

    const service = TestBed.inject(ThemeService);
    service.setPreference('light');

    expect(service.theme()).toBe('light');
  });

  it('toggles between light and dark', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();
    expect(service.theme()).toBe('dark');

    service.toggle();
    expect(service.theme()).toBe('light');
  });

  it('persists an explicit preference', () => {
    TestBed.inject(ThemeService).setPreference('dark');

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('reads the persisted preference on creation', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('dark');
    expect(service.theme()).toBe('dark');
  });

  it('ignores a corrupted persisted value', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'neon');

    expect(TestBed.inject(ThemeService).preference()).toBe('system');
  });

  it('clears storage when returning to the system preference', () => {
    const service = TestBed.inject(ThemeService);
    service.setPreference('dark');
    service.setPreference('system');

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('applies the resolved theme to the document', async () => {
    const service = TestBed.inject(ThemeService);
    service.setPreference('dark');
    await TestBed.inject(ApplicationRef).whenStable();

    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('survives storage being unavailable', () => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('Storage is blocked');
      },
    });

    const service = TestBed.inject(ThemeService);

    expect(() => service.setPreference('dark')).not.toThrow();
    expect(service.theme()).toBe('dark');
  });
});
