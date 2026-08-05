import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TECHNOLOGIES } from '../../../core/config/technologies.config';
import { TechStripTranslations } from '../../../core/i18n/translations/translations.model';
import { createMediaQuerySignal } from '../../../shared/utilities/media-query';

/** Matches the CSS guard in `tech-strip.scss`; the two must not disagree. */
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * A slow, continuous marquee of the technologies used day to day.
 *
 * The loop is two identical tracks side by side, both translated by one track
 * width plus the gap between them. When the first has moved fully out of frame
 * the second is exactly where the first began, so the cycle repeats with no cut
 * — no measurement, no timers, no library, one keyframe.
 *
 * It stops on hover and on focus, so nothing a reader is looking at or tabbing
 * through moves underneath them.
 *
 * Under `prefers-reduced-motion` it does not animate at all: the stylesheet
 * turns the animation off and the second track with it, and this component adds
 * a tab stop so the remaining row can be panned with the arrow keys instead.
 * The CSS half stands on its own, so the reduced-motion promise holds even if
 * this class never runs.
 */
@Component({
  selector: 'app-tech-strip',
  imports: [NgTemplateOutlet],
  templateUrl: './tech-strip.html',
  styleUrl: './tech-strip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStrip {
  readonly copy = input.required<TechStripTranslations>();

  protected readonly technologies = TECHNOLOGIES;
  protected readonly reducedMotion = createMediaQuerySignal(REDUCED_MOTION_QUERY);
}
