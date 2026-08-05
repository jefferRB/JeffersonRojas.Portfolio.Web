import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { EN_TRANSLATIONS } from '../../../../core/i18n/translations/en';
import { WorkProcess } from './work-process';

describe('WorkProcess', () => {
  let fixture: ComponentFixture<WorkProcess>;
  let element: HTMLElement;

  function triggers(): HTMLButtonElement[] {
    return Array.from(element.querySelectorAll<HTMLButtonElement>('.process__trigger'));
  }

  function activeIndex(): number {
    return triggers().findIndex((button) => button.getAttribute('aria-current') === 'step');
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });

    fixture = TestBed.createComponent(WorkProcess);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('renders all four stages with their number, name and description', () => {
    const stages = element.querySelectorAll('.process__stage');
    expect(stages.length).toBe(4);

    for (const stage of EN_TRANSLATIONS.process.stages) {
      expect(element.textContent).toContain(stage.step);
      expect(element.textContent).toContain(stage.name);
      // Every description is always in the DOM, so the section reads fully
      // even when nothing is selected.
      expect(element.textContent).toContain(stage.description);
    }
  });

  it('starts with the first stage selected', () => {
    expect(activeIndex()).toBe(0);
  });

  it('selects a stage on click', async () => {
    triggers()[2].click();
    await fixture.whenStable();

    expect(activeIndex()).toBe(2);
  });

  it('selects a stage on focus, so keyboard tabbing alone drives the section', async () => {
    triggers()[1].dispatchEvent(new FocusEvent('focus'));
    await fixture.whenStable();

    expect(activeIndex()).toBe(1);
  });

  it('moves selection with the arrow keys and wraps around', async () => {
    triggers()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await fixture.whenStable();
    expect(activeIndex()).toBe(1);

    triggers()[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await fixture.whenStable();
    expect(activeIndex()).toBe(0);

    triggers()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    await fixture.whenStable();
    expect(activeIndex()).toBe(3);
  });

  it('marks every stage up to the selected one as reached, for the progress rail', async () => {
    triggers()[2].click();
    await fixture.whenStable();

    const reached = element.querySelectorAll('.process__stage.is-reached');
    expect(reached.length).toBe(3);
  });

  it('exposes each description to its trigger', () => {
    const [first] = triggers();
    const describedBy = first.getAttribute('aria-describedby');

    expect(describedBy).toBe('process-description-discover');
    expect(element.querySelector(`#${describedBy}`)?.textContent).toContain(
      EN_TRANSLATIONS.process.stages[0].description,
    );
  });
});
