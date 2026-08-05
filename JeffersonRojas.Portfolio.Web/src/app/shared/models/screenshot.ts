/**
 * Product screenshots.
 *
 * Ids are grouped per project but form one flat union, because the i18n
 * dictionaries key their alt text and captions by id — one record the compiler
 * can check for completeness beats one record per project that nothing keeps in
 * step. Ids are therefore unique across projects.
 *
 * Copy lives in the dictionaries; the file itself is described here.
 */
export type LuxuryCloudScreenshotId =
  | 'dashboard'
  | 'analytics'
  | 'calendar'
  | 'calendar-day'
  | 'income'
  | 'products'
  | 'staff'
  | 'payroll'
  | 'public-site-editor'
  | 'public-site';

export type NexoPosScreenshotId =
  'overview' | 'branches' | 'inventory' | 'services' | 'mobile-kits' | 'billing' | 'restocking';

export type ScreenshotId = LuxuryCloudScreenshotId | NexoPosScreenshotId;

export interface ScreenshotAsset {
  readonly id: ScreenshotId;
  /** Path under `public/`. */
  readonly src: string;
  /** Intrinsic size. Required: it reserves the box and prevents layout shift. */
  readonly width: number;
  readonly height: number;
  /**
   * `false` while no file is committed. The galleries drop unavailable entries,
   * so an id can be declared — with its copy — before the capture exists.
   */
  readonly available: boolean;
}

/** An ordered gallery for one project. */
export type ScreenshotGallery = readonly ScreenshotAsset[];
