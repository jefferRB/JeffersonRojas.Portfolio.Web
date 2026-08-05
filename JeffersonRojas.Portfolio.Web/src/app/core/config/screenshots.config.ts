import { ScreenshotAsset, ScreenshotGallery } from '../../shared/models/screenshot';

const LUXURYCLOUD_PATH = '/images/projects/luxurycloud';
const NEXOPOS_PATH = '/images/projects/nexopos';

/** Every capture is a 1672x941 window, so the box is the same for all of them. */
const CAPTURE_WIDTH = 1672;
const CAPTURE_HEIGHT = 941;

function capture(path: string, id: ScreenshotAsset['id'], available = true): ScreenshotAsset {
  return {
    id,
    src: `${path}/${id}.webp`,
    width: CAPTURE_WIDTH,
    height: CAPTURE_HEIGHT,
    available,
  };
}

/**
 * LuxuryCloud, in the order the product is best understood: where the business
 * stands, what it decides from, how the day runs, what was charged, what is in
 * stock, who did the work, what they are owed, and finally what the public sees.
 *
 * The tenant owner authorised showing the operational and financial data, so no
 * figure was altered. What was replaced — in the image files themselves rather
 * than with a CSS filter — is the personal data:
 *
 * - client names       -> "Cliente Demo NN"
 * - collaborator names -> "Colaborador NN" (the same person keeps the same
 *                         number across every capture)
 * - avatar initials    -> the matching number
 *
 * One further edit: the public-page editor showed photographs of customers.
 * That authorisation covers the business's own data, not the likeness of the
 * people in its uploads, so those thumbnails are painted out and their frames
 * kept. See `docs/screenshot-audit.md`.
 */
export const LUXURYCLOUD_SCREENSHOTS: ScreenshotGallery = [
  capture(LUXURYCLOUD_PATH, 'dashboard'),
  capture(LUXURYCLOUD_PATH, 'analytics'),
  capture(LUXURYCLOUD_PATH, 'calendar'),
  capture(LUXURYCLOUD_PATH, 'calendar-day'),
  capture(LUXURYCLOUD_PATH, 'income'),
  capture(LUXURYCLOUD_PATH, 'products'),
  capture(LUXURYCLOUD_PATH, 'staff'),
  capture(LUXURYCLOUD_PATH, 'payroll'),
  capture(LUXURYCLOUD_PATH, 'public-site-editor'),
  capture(LUXURYCLOUD_PATH, 'public-site'),
];

/**
 * NexoPOS, a multi-branch veterinary point of sale.
 *
 * Nothing is redacted here and nothing needed to be: the application runs on a
 * purpose-built demo dataset, labelled as such in its own chrome ("Datos de
 * demostración", "Grupo Veterinario Demo"), with sequential placeholder phone
 * numbers and invented branch names.
 *
 * `inventory` is declared but not published: the capture for it was not among
 * the files supplied. Its copy exists, so committing the file is the only step
 * left — the galleries drop entries that are not available.
 */
export const NEXOPOS_SCREENSHOTS: ScreenshotGallery = [
  capture(NEXOPOS_PATH, 'overview'),
  capture(NEXOPOS_PATH, 'branches'),
  capture(NEXOPOS_PATH, 'inventory', false),
  capture(NEXOPOS_PATH, 'services'),
  capture(NEXOPOS_PATH, 'mobile-kits'),
  capture(NEXOPOS_PATH, 'billing'),
  capture(NEXOPOS_PATH, 'restocking'),
];

/** Keyed by project id, so a section can ask for a gallery by name. */
export const PROJECT_GALLERIES = {
  luxurycloud: LUXURYCLOUD_SCREENSHOTS,
  nexopos: NEXOPOS_SCREENSHOTS,
} as const;

/**
 * Candidate for `og:image`. The public business page is the only capture with
 * nothing internal on it at all.
 */
export const OPEN_GRAPH_SCREENSHOT = 'public-site';
