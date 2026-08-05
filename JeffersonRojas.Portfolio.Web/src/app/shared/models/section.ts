/**
 * Identifiers of the in-page sections the navigation links to.
 *
 * They are used as DOM ids, as router fragments, as translation keys and as the
 * targets the active-section observer watches, so keeping them in one typed
 * union prevents those from drifting apart.
 */
export type SectionId = 'overview' | 'projects' | 'process' | 'about' | 'toolkit' | 'contact';

export const SECTION_IDS: readonly SectionId[] = [
  'overview',
  'projects',
  'process',
  'about',
  'toolkit',
  'contact',
] as const;

/** Sections inside the LuxuryCloud case study. */
export type CaseSectionId =
  | 'overview'
  | 'context'
  | 'role'
  | 'process'
  | 'scope'
  | 'architecture'
  | 'challenges'
  | 'learned'
  | 'status';

export const CASE_SECTION_IDS: readonly CaseSectionId[] = [
  'overview',
  'context',
  'role',
  'process',
  'scope',
  'architecture',
  'challenges',
  'learned',
  'status',
] as const;
