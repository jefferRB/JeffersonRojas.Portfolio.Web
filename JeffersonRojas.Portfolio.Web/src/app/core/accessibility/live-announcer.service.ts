import { Injectable, Signal, signal } from '@angular/core';

/**
 * Feeds a single polite live region rendered by the root component.
 *
 * Binding a signal into the template — rather than creating a detached DOM node
 * — keeps the announcer free of direct document access and safe to run during
 * prerendering.
 */
@Injectable({ providedIn: 'root' })
export class LiveAnnouncerService {
  private readonly current = signal('');

  readonly message: Signal<string> = this.current.asReadonly();

  announce(message: string): void {
    this.current.set(message);
  }
}
