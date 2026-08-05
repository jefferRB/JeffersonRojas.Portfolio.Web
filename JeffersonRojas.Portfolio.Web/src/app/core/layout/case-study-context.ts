import { Injectable, Signal, computed, signal } from '@angular/core';

/**
 * Lets a routed case study tell the chrome that it is on screen, so the side
 * navigation can swap its section list for that document's outline.
 *
 * A signal rather than route inspection: the page already knows its own title,
 * and the navigation should not have to hold a map of routes to titles.
 */
@Injectable({ providedIn: 'root' })
export class CaseStudyContext {
  private readonly current = signal<string | null>(null);

  readonly title: Signal<string | null> = this.current.asReadonly();
  readonly isActive = computed(() => this.current() !== null);

  /** Called by a case-study page while it is mounted. */
  activate(title: string): void {
    this.current.set(title);
  }

  clear(): void {
    this.current.set(null);
  }
}
