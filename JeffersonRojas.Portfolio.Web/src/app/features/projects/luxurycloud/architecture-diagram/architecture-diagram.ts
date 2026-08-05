import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ArchitectureSectionCopy } from '../../../../core/i18n/translations/translations.model';

/**
 * Request-to-database layer diagram.
 *
 * Built from an ordered list plus CSS connectors rather than an image or a
 * charting library: the layer names are the content, so they stay real text,
 * translatable, selectable and readable by assistive technology.
 */
@Component({
  selector: 'app-architecture-diagram',
  templateUrl: './architecture-diagram.html',
  styleUrl: './architecture-diagram.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureDiagram {
  readonly copy = input.required<ArchitectureSectionCopy>();
}
