/**
 * The technologies shown in the toolkit marquee.
 *
 * Not in the i18n dictionaries: every one of these is a proper noun that reads
 * the same in both languages, and duplicating them would only create two places
 * for the list to drift.
 *
 * The marks themselves are drawn as inline SVG in `tech-strip.html`, one case
 * per id. They are simplified silhouettes in each project's own colour — the
 * hexagon, the shields, the diamond — not exact trademark reproductions, and
 * they are `aria-hidden`: the visible name underneath carries the meaning, so
 * nothing depends on recognising a logo.
 */
export interface Technology {
  readonly id: TechnologyId;
  /** Full name, shown under the mark. */
  readonly name: string;
}

export type TechnologyId =
  | 'csharp'
  | 'dotnet'
  | 'sqlserver'
  | 'angular'
  | 'typescript'
  | 'javascript'
  | 'aspnetcore'
  | 'html'
  | 'css'
  | 'git';

export const TECHNOLOGIES: readonly Technology[] = [
  { id: 'csharp', name: 'C#' },
  { id: 'dotnet', name: '.NET' },
  { id: 'sqlserver', name: 'SQL Server' },
  { id: 'angular', name: 'Angular' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'aspnetcore', name: 'ASP.NET Core' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'git', name: 'Git' },
];
