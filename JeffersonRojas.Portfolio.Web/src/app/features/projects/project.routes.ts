/**
 * Case-study path segments.
 *
 * The segments are identical in every locale (`/en/projects/luxurycloud` and
 * `/es/projects/luxurycloud`), which keeps routing simple and lets the language
 * switch preserve the current page by swapping only the locale prefix.
 */
export const CASE_STUDY_PATHS = {
  luxurycloud: 'projects/luxurycloud',
} as const;
