import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { CaseStudyContext } from '../../../../core/layout/case-study-context';

import { CLIENT_DEMOS, PROJECT_LINKS } from '../../../../core/config/site.config';
import { localizedPath } from '../../../../core/i18n/locale';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { SeoService } from '../../../../core/seo/seo.service';
import { ClientDemoCard } from '../../../../shared/components/client-demo-card/client-demo-card';
import { CASE_STUDY_PATHS } from '../../project.routes';
import { ArchitectureDiagram } from '../architecture-diagram/architecture-diagram';
import { EngineeringChallenges } from '../engineering-challenges/engineering-challenges';

/**
 * The LuxuryCloud case study.
 *
 * Text and diagrams only. The product captures used to be spread through these
 * sections, one under each argument; in practice they broke the reading and
 * turned the page into a scroll of screenshots. They now live together in the
 * gallery on the home page's Projects section, which is where someone looking
 * for "what does it look like" goes, and this page is left to the reasoning.
 *
 * The one moving image on the page is the recorded client demo beside Context.
 * It stays a still frame until it is asked for, so the rule above still holds
 * on load: nothing here is fetched to be looked at rather than read.
 */
@Component({
  selector: 'app-luxurycloud-page',
  imports: [RouterLink, ArchitectureDiagram, EngineeringChallenges, ClientDemoCard],
  templateUrl: './luxurycloud-page.html',
  styleUrl: './luxurycloud-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuxuryCloudPage {
  private readonly translations = inject(TranslationService);
  private readonly seo = inject(SeoService);

  protected readonly siteUrl = PROJECT_LINKS.luxurycloud;
  protected readonly demo = CLIENT_DEMOS.luxurycloud;

  protected readonly t = this.translations.t;
  protected readonly copy = computed(() => this.translations.t().caseStudies.luxurycloud);
  protected readonly homePath = computed(() => localizedPath(this.translations.locale()));

  constructor() {
    // Tells the chrome to swap its section list for this document's outline
    // while the page is mounted, and to restore it on the way out.
    const caseStudy = inject(CaseStudyContext);
    effect(() => caseStudy.activate(this.copy().name));
    inject(DestroyRef).onDestroy(() => caseStudy.clear());

    effect(() => {
      const meta = this.translations.t().meta.luxurycloud;

      this.seo.apply(this.translations.locale(), {
        title: meta.title,
        description: meta.description,
        path: CASE_STUDY_PATHS.luxurycloud,
        type: 'article',
      });
    });
  }
}
