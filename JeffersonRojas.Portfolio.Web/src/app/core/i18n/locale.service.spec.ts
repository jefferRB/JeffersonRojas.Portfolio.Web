import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Routes, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { LocaleService } from './locale.service';
import { TranslationService } from './translation.service';

@Component({ template: '' })
class TestPage {}

const testRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/en' },
  { path: 'en', component: TestPage },
  { path: 'es', component: TestPage },
  { path: 'en/projects', component: TestPage },
  { path: 'es/projects', component: TestPage },
];

describe('LocaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(testRoutes)] });
  });

  it('resolves the locale from the URL', async () => {
    await RouterTestingHarness.create('/es');

    expect(TestBed.inject(LocaleService).locale()).toBe('es');
  });

  it('falls back to English when the URL has no known prefix', async () => {
    await RouterTestingHarness.create('/');

    expect(TestBed.inject(LocaleService).locale()).toBe('en');
  });

  it('switches language and keeps the equivalent route', async () => {
    const harness = await RouterTestingHarness.create('/en/projects');
    const service = TestBed.inject(LocaleService);

    await service.switchTo('es');
    harness.detectChanges();

    expect(service.locale()).toBe('es');
    expect(service.url()).toBe('/es/projects');
  });

  it('updates the document language attribute', async () => {
    const harness = await RouterTestingHarness.create('/es');

    // The effect runs as part of change detection.
    harness.detectChanges();

    expect(document.documentElement.lang).toBe('es');
  });

  it('exposes the translated dictionary for the active locale', async () => {
    const harness = await RouterTestingHarness.create('/es');
    const translations = TestBed.inject(TranslationService);
    harness.detectChanges();

    expect(translations.t().nav.items[1].label).toBe('Proyectos');

    await TestBed.inject(LocaleService).switchTo('en');
    harness.detectChanges();

    expect(translations.t().nav.items[1].label).toBe('Projects');
  });
});
