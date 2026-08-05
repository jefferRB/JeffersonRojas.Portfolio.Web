import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ChallengesSectionCopy } from '../../../../core/i18n/translations/translations.model';

/**
 * Problem / decision / verification blocks.
 *
 * The three-part shape is the argument: it shows the reasoning and how the
 * result was checked, instead of asserting that something works.
 */
@Component({
  selector: 'app-engineering-challenges',
  templateUrl: './engineering-challenges.html',
  styleUrl: './engineering-challenges.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngineeringChallenges {
  readonly copy = input.required<ChallengesSectionCopy>();
}
