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
  /** How the profile is shown to a reader. Not a translated string: it is a name. */
  readonly linkedinName: string;
  readonly githubUrl: string | null;
}

/**
 * The single source for every contact channel. The hero button, the contact
 * rows and the footer all read the profile URL from here — it is written once,
 * so it cannot drift between the three places that link to it.
 *
 * Only channels that actually exist are listed. The phone number on the résumé
 * is deliberately not published on the page; the PDF carries it for whoever
 * downloads it.
 */
export const CONTACT_CONFIG: ContactConfig = {
  email: '05jeffer03@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/efferson-rojas-brizuela/',
  linkedinName: 'Jefferson Rojas Brizuela',
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

export interface ClientDemoConfig {
  /** YouTube id. Everything else — embed, thumbnails — is derived from it. */
  readonly videoId: string;
  /** Public watch page, for the secondary link on the project card. */
  readonly watchUrl: string;
}

/**
 * Recorded product demos, hosted on YouTube.
 *
 * The id is enough to build both the privacy-enhanced embed and the still
 * frames, so only it and the public watch URL are configured here. Nothing on
 * the site talks to YouTube until a reader asks for playback.
 */
export const CLIENT_DEMOS: Readonly<Record<'luxurycloud', ClientDemoConfig>> = {
  luxurycloud: {
    videoId: '_QuuepUXQlo',
    watchUrl: 'https://www.youtube.com/watch?v=_QuuepUXQlo',
  },
};
