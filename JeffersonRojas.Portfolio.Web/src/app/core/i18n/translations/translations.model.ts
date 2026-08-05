import { ProjectId } from '../../../shared/models/project';
import { ScreenshotId } from '../../../shared/models/screenshot';
import { CaseSectionId, SectionId } from '../../../shared/models/section';
import { WorkProcessStageId } from '../../../shared/models/work-process';
import { Locale } from '../locale';

/**
 * The complete, typed shape of the site copy.
 *
 * Every dictionary must satisfy this interface, so a missing or misspelled key
 * is a compile error rather than a blank spot on the page. Templates read from
 * here instead of holding literal strings.
 */
export interface Translations {
  readonly meta: MetaTranslations;
  readonly a11y: AccessibilityTranslations;
  readonly common: CommonTranslations;
  readonly nav: NavTranslations;
  readonly hero: HeroTranslations;
  readonly process: ProcessTranslations;
  readonly work: WorkTranslations;
  readonly about: AboutTranslations;
  readonly toolkit: ToolkitTranslations;
  readonly contact: ContactTranslations;
  readonly caseStudies: CaseStudyTranslations;
  readonly screenshots: ScreenshotTranslations;
  readonly footer: FooterTranslations;
}

export interface ScreenshotTranslations {
  /** Shown in place of an image that has not been published yet. */
  readonly pending: string;
  readonly zoomLabel: string;
  readonly dialogLabel: string;
  readonly close: string;
  readonly carousel: CarouselTranslations;
  /** Keyed by screenshot id, so neither language can miss one. */
  readonly items: Readonly<Record<ScreenshotId, ScreenshotCopy>>;
}

export interface CarouselTranslations {
  /** `aria-roledescription` for the gallery, e.g. "carousel". */
  readonly roleDescription: string;
  readonly previous: string;
  readonly next: string;
  /**
   * Whole sentences with placeholders rather than fragments to concatenate:
   * word order around a number is not the same in every language.
   */
  readonly goTo: string;
  readonly position: string;
}

export interface ScreenshotCopy {
  /** Describes what the capture shows, for readers who cannot see it. */
  readonly alt: string;
  /** Adds context the surrounding paragraph does not already give. */
  readonly caption: string;
}

// --- Document metadata ----------------------------------------------------

export interface MetaTranslations {
  readonly home: PageMetaTranslations;
  readonly luxurycloud: PageMetaTranslations;
}

export interface PageMetaTranslations {
  readonly title: string;
  readonly description: string;
}

// --- Accessibility and shared labels --------------------------------------

export interface AccessibilityTranslations {
  readonly skipToContent: string;
  readonly languageGroupLabel: string;
  readonly languageChanged: string;
  readonly localeNames: Readonly<Record<Locale, string>>;
  readonly themeControlLabel: string;
  readonly switchToLight: string;
  readonly switchToDark: string;
  readonly opensInNewTab: string;
}

export interface CommonTranslations {
  readonly downloadResume: string;
  /** The network's own name, identical in both languages. */
  readonly linkedin: string;
  /** Appended to the résumé link's accessible name, e.g. "PDF". */
  readonly resumeFormatLabel: string;
  readonly backToPortfolio: string;
  readonly viewCaseStudy: string;
  readonly visitSite: string;
  readonly roleLabel: string;
  readonly statusLabel: string;
  readonly stackLabel: string;
}

// --- Chrome ---------------------------------------------------------------

export interface NavTranslations {
  readonly brand: string;
  readonly primaryLabel: string;
  readonly caseNavLabel: string;
  /** Accessible names for the collapsed section-index trigger. */
  readonly openIndex: string;
  readonly closeIndex: string;
  readonly items: readonly NavItemCopy[];
  readonly caseItems: readonly CaseNavItemCopy[];
}

export interface NavItemCopy {
  readonly id: SectionId;
  readonly label: string;
}

export interface CaseNavItemCopy {
  readonly id: CaseSectionId;
  readonly label: string;
}

export interface FooterTranslations {
  readonly role: string;
  readonly navLabel: string;
}

// --- Home sections --------------------------------------------------------

export interface HeroTranslations {
  /** The name. It is the page's h1 and the loudest thing on it. */
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly secondary: string;
  readonly actions: HeroActionsTranslations;
  readonly flow: HeroFlowTranslations;
}

export interface HeroActionsTranslations {
  readonly viewWork: string;
}

export interface HeroFlowTranslations {
  readonly label: string;
  readonly steps: readonly string[];
}

export interface ProcessTranslations {
  readonly eyebrow: string;
  readonly title: string;
  readonly listLabel: string;
  readonly activeStageLabel: string;
  readonly stages: readonly ProcessStageCopy[];
}

export interface ProcessStageCopy {
  readonly id: WorkProcessStageId;
  readonly step: string;
  readonly name: string;
  readonly description: string;
}

export interface WorkTranslations {
  readonly title: string;
  readonly lead: string;
  readonly featured: FeaturedProjectCopy;
  readonly others: readonly ProjectCopy[];
}

export interface FeaturedProjectCopy {
  readonly id: ProjectId;
  readonly name: string;
  readonly status: string;
  readonly role: string;
  readonly description: string;
  readonly primaryStack: readonly string[];
  readonly secondaryStack: readonly string[];
}

export interface ProjectCopy {
  readonly id: ProjectId;
  readonly name: string;
  readonly status: string;
  readonly description: string;
  readonly stack: readonly string[];
}

export interface AboutTranslations {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly education: EducationCopy;
  readonly languages: LanguagesCopy;
  readonly principles: PrinciplesCopy;
}

export interface EducationCopy {
  readonly label: string;
  readonly degree: string;
  readonly institution: string;
  readonly year: string;
}

export interface LanguagesCopy {
  readonly label: string;
  readonly items: readonly { readonly name: string; readonly level: string }[];
}

export interface PrinciplesCopy {
  readonly label: string;
  readonly items: readonly string[];
}

export interface ToolkitTranslations {
  readonly title: string;
  readonly lead: string;
  /**
   * Heading for the technology strip. The technologies themselves are proper
   * nouns and live in `core/config/technologies.config.ts`, not here.
   */
  readonly technologiesLabel: string;
  readonly strip: TechStripTranslations;
  readonly skillsLabel: string;
  readonly skills: readonly SkillCopy[];
  readonly cta: ToolkitCtaCopy;
}

export interface TechStripTranslations {
  /** Accessible name of the technology list inside the marquee. */
  readonly label: string;
}

export interface SkillCopy {
  /** Selects the icon; the component owns the drawing. */
  readonly id: SkillId;
  readonly title: string;
  /** One short line. Anything longer turns the grid into a wall of prose. */
  readonly description: string;
}

export type SkillId =
  | 'oop'
  | 'di'
  | 'ui'
  | 'data'
  | 'api'
  | 'git'
  | 'devops'
  | 'security'
  | 'testing'
  | 'observability';

export interface ToolkitCtaCopy {
  readonly title: string;
  readonly message: string;
  readonly action: string;
}

export interface ContactTranslations {
  readonly title: string;
  readonly message: string;
  /** A quiet second line under the message. Not a status, just a fact. */
  readonly location: string;
  readonly emailLabel: string;
  readonly linkedinLabel: string;
  /** What the résumé row does, e.g. "Download PDF". */
  readonly resumeAction: string;
  readonly githubLabel: string;
}

// --- Case studies ---------------------------------------------------------

export interface CaseStudyTranslations {
  readonly luxurycloud: LuxuryCloudCaseStudy;
}

export interface LuxuryCloudCaseStudy {
  readonly name: string;
  readonly tag: string;
  readonly role: string;
  readonly summary: string;
  readonly context: ProseSectionCopy;
  readonly myRole: RoleSectionCopy;
  readonly flow: FlowSectionCopy;
  readonly scope: GroupedSectionCopy;
  readonly architecture: ArchitectureSectionCopy;
  readonly challenges: ChallengesSectionCopy;
  readonly learned: ListSectionCopy;
  readonly status: StatusSectionCopy;
}

export interface ProseSectionCopy {
  readonly title: string;
  readonly paragraphs: readonly string[];
}

export interface RoleSectionCopy {
  readonly title: string;
  readonly lead: string;
  readonly groups: readonly LabelledListCopy[];
}

export interface FlowSectionCopy {
  readonly title: string;
  readonly stages: readonly CaseStudyStageCopy[];
}

export interface CaseStudyStageCopy {
  readonly id: WorkProcessStageId;
  readonly name: string;
  readonly description: string;
}

export interface GroupedSectionCopy {
  readonly title: string;
  readonly groups: readonly LabelledListCopy[];
}

export interface LabelledListCopy {
  readonly label: string;
  readonly items: readonly string[];
}

export interface ArchitectureSectionCopy {
  readonly title: string;
  readonly lead: string;
  readonly diagramLabel: string;
  readonly layers: readonly ArchitectureLayerCopy[];
  readonly crossCutting: LabelledListCopy;
}

export interface ArchitectureLayerCopy {
  readonly id: string;
  readonly name: string;
  readonly note: string;
}

export interface ChallengesSectionCopy {
  readonly title: string;
  readonly problemLabel: string;
  readonly decisionLabel: string;
  readonly verificationLabel: string;
  readonly items: readonly ChallengeCopy[];
}

export interface ChallengeCopy {
  readonly id: string;
  readonly title: string;
  readonly problem: string;
  readonly decision: string;
  readonly verification: string;
}

export interface ListSectionCopy {
  readonly title: string;
  readonly items: readonly string[];
}

export interface StatusSectionCopy {
  readonly title: string;
  readonly value: string;
}
