# JeffersonRojas.Portfolio.Web

Bilingual professional portfolio for **Jefferson Rojas** — Software Engineer and Product Builder, Costa Rica.

The site exists to show the full arc of building software: understanding a real process, shaping it into a product, building it, shipping it, and keeping it running — not just writing code.

---

## Stack

| Concern          | Choice                                             |
| ---------------- | -------------------------------------------------- |
| Framework        | Angular 22 (standalone components, zoneless)        |
| Language         | TypeScript 6, `strict` + `strictTemplates`          |
| State            | Angular Signals                                     |
| Styling          | SCSS with CSS custom properties as design tokens    |
| Routing          | `@angular/router`, locale-prefixed routes           |
| Tests            | Vitest + jsdom (via `@angular/build:unit-test`)     |
| Formatting       | Prettier                                            |

No UI framework, no CSS framework, no animation library, no CMS, no backend. The only runtime dependencies are Angular itself, RxJS and tslib.

## Requirements

- Node.js 22.12+ (developed on 24.18)
- npm 11+

## Commands

```bash
npm install
```

```bash
npm start
```

```bash
npm run test:ci
```

```bash
npm run build
```

`npm start` serves on `http://127.0.0.1:56596`. `npm test` runs Vitest in watch mode; `npm run test:ci` runs once and exits. `npm run build` produces an optimised bundle in `dist/`. `npm run format` applies Prettier.

## Architecture

```text
src/app/
├── core/            # cross-cutting, one instance per app
│   ├── accessibility/   skip link, live announcer
│   ├── config/          site origin, résumé asset
│   ├── i18n/            locale resolution + typed dictionaries
│   ├── layout/          header, footer, language switcher, theme toggle
│   ├── seo/             title, meta, canonical, hreflang
│   └── theme/           light/dark resolution and persistence
├── shared/          # reusable, no feature knowledge
│   ├── components/      placeholder-section
│   ├── directives/      focus-trap
│   ├── models/          section / project / process ids
│   └── utilities/       SSR-safe matchMedia and localStorage
├── features/
│   ├── home/            home page + hero and work-process sections
│   ├── about/           about section (placeholder)
│   ├── projects/        selected work section (placeholder)
│   └── contact/         contact section (placeholder)
├── app.config.ts
├── app.routes.ts
└── app.ts
```

`core/` holds what the whole application depends on, `shared/` holds what anything may reuse, and `features/` holds what the visitor actually sees. Dependencies only point inward: features may use shared and core, never the reverse.

Longer notes live in [`docs/architecture.md`](docs/architecture.md).

## Languages

English is primary, Spanish secondary. Every public URL carries its locale:

```text
/                           redirects to /en
/en                         English home
/es                         Spanish home
/en/projects/luxurycloud    English case study
/es/projects/luxurycloud    Spanish case study
```

Path segments after the locale prefix are identical in both languages, so
switching language swaps only the prefix and keeps the reader on the same page.

The URL is the single source of truth. `LocaleService` reads the locale from the first path segment and exposes it as a signal; `TranslationService` turns that into a fully typed `Translations` object. Components read `t().hero.title` — one component per view, never one per language.

Switching language rewrites only the locale segment, so path, query string and fragment survive: `/es/projects#work` → `/en/projects#work`. The `<html lang>` attribute follows automatically, and the change is announced in a polite live region.

Copy lives in `core/i18n/translations/en.ts` and `es.ts`, both constrained by the `Translations` interface — a missing or misspelled key fails the build rather than rendering blank. Translations are written, not machine generated.

## Themes

Three internal preferences: `system`, `light`, `dark`. The visible control toggles light/dark; the service starts from `system` until the visitor states otherwise.

- One set of CSS custom properties on `:root`; only the values change per theme. No stylesheet is duplicated.
- Resolution order: `:root` (light) → `@media (prefers-color-scheme: dark)` for `:root:not([data-theme])` → explicit `[data-theme]`.
- The preference is persisted in `localStorage`; choosing `system` removes the key so the media query takes over again.
- A tiny inline script in `index.html` applies the theme before first paint, which is what prevents a flash. Its storage key must stay in sync with `THEME_STORAGE_KEY`.
- All browser access (`localStorage`, `matchMedia`, `document`) goes through guarded helpers, so nothing breaks under prerendering.

## Accessibility

Treated as part of the build, not a pass at the end.

- Semantic landmarks, one `<h1>`, ordered heading levels
- Skip link to `#main-content`
- Visible focus indicator on every interactive element, never removed
- Mobile menu is a real modal: focus trapped, `Escape` closes it, focus returns to the trigger, background scroll locked
- The work-process selector responds to click, focus and arrow keys — never hover alone
- State is carried by text and shape as well as colour
- Touch targets at least 44px
- `prefers-reduced-motion` honoured globally
- Icons always paired with an accessible name; ARIA used only where native HTML falls short
- Layout survives 200% zoom without horizontal scrolling

## Decisions worth knowing

- **Standalone, zoneless.** The Visual Studio template generated an NgModule app; it was migrated to `bootstrapApplication` with `provideZonelessChangeDetection()`. There are no NgModules left.
- **No `@angular/cdk`.** The only thing needed from it was a focus trap, which is ~50 lines in `shared/directives/focus-trap.ts`. Adding the package for that alone was not worth the dependency.
- **Explicit locale routes** (`/en`, `/es`) instead of a `:locale` parameter, so the router config alone enumerates both URLs — which is what a future prerender pass needs.
- **The section content is always in the DOM.** The process selector emphasises a stage rather than revealing it, so the page reads completely with JavaScript or CSS transitions unavailable, and selecting a stage never reflows the layout.
- **Every outbound link is typed configuration.** `core/config/site.config.ts` holds the résumé asset, the email and the social URLs. A social URL of `null` renders no link at all, so the site can never ship a dead one. The phone number on the résumé is deliberately not published on the page.
- **No fabricated product imagery.** The screenshot slot in Selected Work is an empty, labelled container. A mocked-up dashboard would misrepresent a product that really exists.
- **`https://portfolio.example.com` is a placeholder domain**, defined once in `core/config/site.config.ts`.
- **Karma was removed.** `angular.json` referenced `karma.conf.js` with an option the v22 builder rejects, and no Karma package was installed — `ng test` failed outright. The project now uses the Vitest runner it was already configured for.

## Content rules

The site states only what can be backed up. No invented employers, clients, metrics, user counts, revenue, certifications, years of experience, testimonials or links. NexoPOS is labelled a prototype and PersonalOS is labelled in development, because that is what they are.

`content-integrity.spec.ts` enforces this: it walks every string in both dictionaries and fails the build on forbidden content, including percentage and revenue patterns, invented seniority titles, the phone number, and any mention of La Catalina.

## Deliberately out of scope

No backend or API, no database, no authentication, no Docker, no CMS, no analytics, no remote images or fonts, no contact form. Only LuxuryCloud has a case study; NexoPOS and PersonalOS are listed with their status and nothing more.

## Next steps

1. Add real LuxuryCloud screenshots to the reserved slot in Selected Work.
2. Publish the LinkedIn and GitHub URLs in `CONTACT_CONFIG` once they exist.
3. Set the production domain in `SITE_CONFIG.origin`.
4. Write the NexoPOS and PersonalOS case studies under `/:locale/projects/:slug`.
5. Add `@angular/ssr` and prerender all four routes; the services are already written for it.
6. Add `angular-eslint`; the project currently has formatting but no linting.
