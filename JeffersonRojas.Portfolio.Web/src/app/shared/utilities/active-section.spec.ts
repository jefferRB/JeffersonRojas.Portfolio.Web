import { Component, Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';

import { createActiveSectionSignal } from './active-section';

/**
 * jsdom has no IntersectionObserver, and a hidden browser tab never fires one,
 * so the behaviour is driven through a controllable stub. This is the only way
 * to assert the selection rule rather than assume it.
 */
type Callback = (entries: IntersectionObserverEntry[]) => void;

interface Harness {
  readonly observed: string[];
  readonly unobserved: string[];
  emit(updates: { id: string; isIntersecting: boolean; top: number }[]): void;
  disconnected: boolean;
}

const originalObserver = (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver;

function installObserverStub(): Harness {
  const observed: string[] = [];
  const unobserved: string[] = [];
  let callback: Callback = () => undefined;
  const state: Harness = {
    observed,
    unobserved,
    disconnected: false,
    emit(updates) {
      callback(
        updates.map(
          (update) =>
            ({
              target: { id: update.id } as Element,
              isIntersecting: update.isIntersecting,
              boundingClientRect: { top: update.top } as DOMRectReadOnly,
            }) as IntersectionObserverEntry,
        ),
      );
    },
  };

  class ObserverStub {
    constructor(cb: Callback) {
      callback = cb;
    }
    observe(element: Element): void {
      observed.push(element.id);
    }
    disconnect(): void {
      state.disconnected = true;
    }
    unobserve(element: Element): void {
      unobserved.push(element.id);
    }
  }

  (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver = ObserverStub;
  return state;
}

@Component({ template: '' })
class Host {
  readonly active: Signal<string | null>;

  constructor() {
    this.active = createActiveSectionSignal(['one', 'two', 'three']);
  }
}

async function createHost(): Promise<Host> {
  for (const id of ['one', 'two', 'three']) {
    const section = document.createElement('section');
    section.id = id;
    document.body.appendChild(section);
  }

  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  return fixture.componentInstance;
}

afterEach(() => {
  (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver = originalObserver;
  for (const id of ['one', 'two', 'three']) {
    document.getElementById(id)?.remove();
  }
});

describe('createActiveSectionSignal', () => {
  it('starts with nothing active', async () => {
    installObserverStub();
    const host = await createHost();

    expect(host.active()).toBeNull();
  });

  it('observes every section that exists', async () => {
    const stub = installObserverStub();
    await createHost();

    expect(stub.observed).toEqual(['one', 'two', 'three']);
  });

  it('activates the section that comes into view', async () => {
    const stub = installObserverStub();
    const host = await createHost();

    stub.emit([{ id: 'two', isIntersecting: true, top: 40 }]);

    expect(host.active()).toBe('two');
  });

  it('prefers the highest section when several are visible at once', async () => {
    const stub = installObserverStub();
    const host = await createHost();

    stub.emit([
      { id: 'three', isIntersecting: true, top: 400 },
      { id: 'two', isIntersecting: true, top: 90 },
    ]);

    // The reader has most recently passed the topmost heading.
    expect(host.active()).toBe('two');
  });

  it('keeps the last active section when everything leaves the band', async () => {
    const stub = installObserverStub();
    const host = await createHost();

    stub.emit([{ id: 'two', isIntersecting: true, top: 40 }]);
    stub.emit([{ id: 'two', isIntersecting: false, top: -200 }]);

    // Blanking the highlight mid-scroll reads as a flicker, so it holds.
    expect(host.active()).toBe('two');
  });

  describe('when a navigation replaces the sections', () => {
    /** Lets the MutationObserver callback run; it is batched per microtask. */
    const settle = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

    function swapSections(): void {
      for (const id of ['one', 'two', 'three']) {
        document.getElementById(id)?.remove();
        const replacement = document.createElement('section');
        replacement.id = id;
        document.body.appendChild(replacement);
      }
    }

    it('re-observes the new elements instead of the detached ones', async () => {
      const stub = installObserverStub();
      await createHost();
      expect(stub.observed).toEqual(['one', 'two', 'three']);

      swapSections();
      await settle();

      // The old nodes are released and the fresh ones picked up: without this,
      // a routed page's sections would never be watched at all.
      expect(stub.unobserved).toEqual(['one', 'two', 'three']);
      expect(stub.observed).toEqual(['one', 'two', 'three', 'one', 'two', 'three']);
    });

    it('drops the highlight rather than carrying it onto the next page', async () => {
      const stub = installObserverStub();
      const host = await createHost();

      stub.emit([{ id: 'two', isIntersecting: true, top: 40 }]);
      expect(host.active()).toBe('two');

      for (const id of ['one', 'two', 'three']) {
        document.getElementById(id)?.remove();
      }
      await settle();

      expect(host.active()).toBeNull();
    });
  });

  it('falls back to nothing active when IntersectionObserver is unavailable', async () => {
    (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver = undefined;

    const host = await createHost();

    // The links are ordinary anchors, so navigation still works; only the
    // highlight is lost.
    expect(host.active()).toBeNull();
  });

  it('disconnects when the component is destroyed', async () => {
    const stub = installObserverStub();
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();

    fixture.destroy();

    expect(stub.disconnected).toBe(true);
  });
});
