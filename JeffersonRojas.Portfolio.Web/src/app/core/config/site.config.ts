/**
 * Application-level constants that are expected to change once, at deploy time,
 * plus every outbound link on the site. Nothing hard-codes a domain, an address
 * or an asset path anywhere else.
 */
export const SITE_CONFIG = {
  /**
   * PLACEHOLDER DOMAIN - replace before the first public deploy.
   * Used to build canonical URLs, Open Graph URLs and hreflang alternates.
   */
  origin: 'https://portfolio.example.com',
  name: 'Jefferson Rojas',
} as const;

export interface ContactConfig {
  readonly email: string;
  /** `null` means "not published yet"; the UI then renders no link at all. */
  readonly linkedinUrl: string | null;
  readonly githubUrl: string | null;
}

/**
 * Only channels that actually exist are listed. The phone number on the résumé
 * is deliberately not published on the page; the PDF carries it for whoever
 * downloads it.
 */
export const CONTACT_CONFIG: ContactConfig = {
  email: '05jeffer03@gmail.com',
  linkedinUrl: null,
  githubUrl: null,
};

export interface ResumeConfig {
  readonly available: boolean;
  readonly path: string;
  readonly format: string;
}

/**
 * The résumé lives in `public/documents/` and is served as a static asset.
 * The filename is what the browser saves, so it is kept clean and stable.
 * Exactly one résumé file exists in the public directory at any time.
 */
export const RESUME_CONFIG: ResumeConfig = {
  available: true,
  path: '/documents/Jefferson-Rojas-Software-Engineer.pdf',
  format: 'PDF',
};

/** Live product URLs, referenced from the work section and the case study. */
export const PROJECT_LINKS = {
  luxurycloud: 'https://luxurycloud.app',
} as const;
