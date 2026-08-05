/** The four stages of the delivery process presented on the home page. */
export type WorkProcessStageId = 'discover' | 'design' | 'build' | 'operate';

/** Canonical stage order. Copy for each stage lives in the i18n dictionaries. */
export const WORK_PROCESS_STAGE_IDS: readonly WorkProcessStageId[] = [
  'discover',
  'design',
  'build',
  'operate',
] as const;
