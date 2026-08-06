# Architecture

Short notes on how this application is put together and why. For commands and
project overview see the [README](../README.md).

## Layering

```text
features ──▶ shared ──▶ core
```

Dependencies point one way only.

- **`core/`** — instantiated once for the whole app: locale, translations, theme,
  SEO, layout chrome, accessibility primitives. Services are
  `providedIn: 'root'`.
- **`shared/`** — reusable pieces with no knowledge of any feature: the
  screenshot figure and its gallery, id unions, SSR-safe browser helpers.
- **`features/`** — what the visitor sees. A feature may import from `shared`
  and `core`; nothing imports back into a feature.

`core/i18n/locale.ts` is deliberately dependency-free — pure functions over
strings — so URL handling can be unit tested without a router or a TestBed.

## Change detection

The app is zoneless (`provideZonelessChangeDetection()`; `zone.js` is not
installed). Every component is `OnPush` and every piece of state is a signal.
There are no manual `markForCheck` calls and no subscriptions in components:
the one place RxJS appears is `LocaleService`, which converts router events into
a signal with `toSignal`.

## Locale resolution

```text
URL ──▶ LocaleService.locale (signal) ──▶ TranslationService.t (computed) ──▶ templates
```

Routes are declared explicitly per locale rather than through a `:locale`
parameter:

```ts
SUPPORTED_LOCALES.map((locale) => ({ path: locale, children: [...] }))
```

This keeps two properties that a parameterised route loses: the router config
alone enumerates every public URL (which a prerender pass needs), and an
unsupported prefix such as `/fr` falls through to the wildcard instead of
matching and then failing later.

`replaceLocaleInUrl` swaps only the first segment, preserving query string and
fragment, so switching language keeps the reader on the same spot on the page.

Copy is a single typed tree (`Translations`). Adding a key means adding it to
the interface, which then fails the build in whichever dictionary is missing it.
That is the mechanism that keeps the two languages in step — not discipline.

## Theming

```text
:root                                  → light values
@media (prefers-color-scheme: dark)
  :root:not([data-theme])              → dark values, before any choice is made
:root[data-theme='light' | 'dark']     → explicit choice, wins
```

Only custom property *values* change; no rule set is duplicated per theme, and
component stylesheets never reference a colour directly.

The flash-of-wrong-theme problem is solved before Angular boots, by an inline
script in `index.html` that reads the stored preference and stamps
`data-theme` on `<html>`. `ThemeService` then adopts the same value, so the two
never disagree. The trade-off is one duplicated string — the storage key —
which is flagged in both files.

Choosing `system` deletes the stored key rather than writing `"system"`, so the
media query becomes authoritative again for both the script and the service.

## Rendering safety

Nothing touches `window`, `document` or `localStorage` directly. Instead:

- `injectLocalStorage()` returns `null` off the browser or when storage access
  throws (private mode, blocked cookies), and every read/write is wrapped.
- `createMediaQuerySignal()` returns a constant `false` signal when `matchMedia`
  is unavailable, and unregisters its listener through `DestroyRef`.
- `createActiveSectionSignal()` observes nothing off the browser and reports
  `null`, which the section index treats as "no entry highlighted".
- `SeoService` writes through the injected `DOCUMENT`, which works during
  prerendering too.

SSR is not installed yet. The code is written so that adding `@angular/ssr`
later is a configuration change rather than a refactor.

## Page chrome

There is no navigation column and no top bar. The page owns the full width;
two small elements float above it:

- `ViewControls` — language and theme, fixed to the top-right corner on a
  translucent blurred surface.
- `SectionIndex` — a narrow vertical index of the current page's sections,
  docked to the right edge from 1024px up and collapsed to a single trigger
  below that. On a case-study route it swaps its list for that document's
  outline, which `CaseStudyContext` signals.

The index deliberately echoes the hero pipeline — a line with a node per stop —
so it reads as the document's own path rather than as an application menu. The
active entry is reported by `IntersectionObserver`, but every entry is an
ordinary fragment link: without the observer the index still navigates, it just
stops highlighting. `aria-current="location"` marks the active one.

`--index-width` and `--index-inset` are the contract between the two: the index
uses them to place itself, and `.container` reserves exactly `--index-width`
as trailing padding so the index can never sit on top of the content.

## The product galleries

Captures live in `app-screenshot-carousel` instances in the home page's Projects
section — one per project that has any — and nowhere else on the site. The
config exposes them as `PROJECT_GALLERIES`, keyed by project; the section maps a
gallery to slides by looking each capture's copy up by id and dropping the
entries with no file yet, so a capture can be declared and written about before
it exists.

Ids are unique across projects because the dictionaries key alt text and
captions by id alone. `assets.spec.ts` enforces that, along with "no available
entry without a file" and "no file without an entry".

A host caps a gallery with `--shot-max-width`, which bounds the whole component
— image, caption and controls together — rather than only the picture. That is
what keeps the chrome inside the media block instead of spanning the column
behind it.

The control bar reflows on a container query, not a media query: the same
gallery is 561px in one column and 352px in another at the very same viewport,
and only the block's own width says which layout the dots need.

It is a few dozen lines rather than a dependency, because what it has to do is
small: show one capture, move between them, and stay operable from a keyboard.
There is no auto-advance and no transition on the swap — these are dense
interface screenshots, and anything that slides or fades them reads as
marketing rather than as evidence.

The visible slide is a single `app-screenshot`, so the figure semantics, the
intrinsic sizing and the enlarge dialog are the ones already tested there
instead of a second copy. Only the two neighbouring captures are prefetched;
rendering all of them would pull the whole gallery over the wire on first paint
to show one image.

Semantics follow the APG carousel pattern: a `group` with
`aria-roledescription`, named prev/next buttons, one named button per capture
carrying `aria-current`, and a polite live region that announces the new
position together with the caption. The visible `3 / 8` counter is
`aria-hidden` — it is a fragment, and the live region says the whole sentence.

## The recorded client demo

One video, hosted on YouTube, offered in two places: a quiet secondary link on
the LuxuryCloud card in Projects, and `app-client-demo-card` beside the Context
text of the case study. `CLIENT_DEMOS` in `site.config.ts` holds the id and the
public watch URL; the embed and both thumbnail URLs are derived from the id, so
nothing repeats the video's address.

The card contacts YouTube for exactly one thing before a click: the still frame,
lazily, with intrinsic dimensions and a fixed 16:9 box so it cannot shift the
page. No iframe, no player script. `maxresdefault` does not exist for every
upload, so a failed load falls back to `hqdefault`, which always does.

Playback mounts the frame inside a native `<dialog>` — the same element the
screenshot enlarger uses, and for the same reasons: the focus trap, Escape and
background inerting come from the platform. Three things are added on top:

- The frame is inside an `@if` on the open state, so a closed player is not a
  hidden video still holding a connection.
- Focus restoration is explicit. The card has two triggers, and the reader has
  to land back on the one they pressed, not on whichever the platform saw last.
- The document is locked against scrolling while the player is open, and the
  teardown runs directly from the close button rather than waiting for the
  queued `close` event. It is idempotent, so the event arriving afterwards — or
  Escape, or the backdrop — costs nothing.

The embed is on `youtube-nocookie.com`, `allow` is narrowed to what playback
needs, and `autoplay=1` is safe because the frame only ever exists inside the
click that asked for it. The id is matched against a pattern before it is
interpolated into the URL the sanitizer is told to trust.

## The technology marquee

The toolkit's technology row loops continuously. The mechanism is two identical
tracks side by side, both translated by one track width **plus the gap between
them** — when the first leaves the frame the second is exactly where the first
began, so the cycle repeats with no seam. That is the whole implementation: one
keyframe, no measurement, no timers, no library. The travel and the gap read the
same custom property, because a marquee that hard-codes them in two places
stutters once per cycle.

It pauses on `:hover` and on `:focus-within`, and the first track is a tab stop.
That is deliberate: the movement never stops on its own, so WCAG 2.2.2 needs a
way to stop it, and hover alone would leave keyboard users without one.

Only the first track is in the accessibility tree — it is a labelled list of the
ten technologies. The duplicate is `aria-hidden`; it is scenery.

Under `prefers-reduced-motion` nothing animates: the stylesheet drops the
animation and the duplicate track, and turns the remaining one into a manual
scroller. The rule lives in a media query as well as in a class, so the promise
holds with no JavaScript at all; the class only exists so the component can also
react to the preference changing.

The technologies live in `core/config/technologies.config.ts` rather than in the
dictionaries: they are proper nouns that read the same in both languages. Their
marks are drawn as inline SVG, one `@switch` case each — simplified silhouettes
in each project's own colour, not exact trademarks. They are `aria-hidden` and
the visible name sits underneath, so nothing depends on recognising a logo.

## The work-process section

The requirement was an interactive selector that still works when JavaScript or
animation does not. The resolution: **every stage description is permanently in
the DOM**. Selecting a stage only changes emphasis — the progress rail fills to
that point, the surface lifts, the number takes the accent colour. Nothing is
shown or hidden, which is also why the layout cannot jump.

Semantics are native: an `<ol>` of stages, each with a real `<button>`, and
`aria-current="step"` on the selected one. No `tablist` role, because tabs imply
hidden panels and there are none. Activation is bound to click, focus and arrow
keys; hover is an extra, never the only route.

## Testing

Vitest under jsdom, through `@angular/build:unit-test`. `src/test-setup.ts`
installs a neutral `matchMedia` stub, since jsdom has none and both the theme
service and the section index depend on it; specs that care about a specific
media state replace it themselves.

Run it with `npm run test:ci` (`ng test --watch=false`). The Angular unit-test
builder does not accept vitest's `--run` flag.

Coverage is aimed at behaviour that would be expensive to get wrong: locale
parsing and rewriting, language switching, theme resolution and persistence
(including hostile storage), hero rendering in both languages, the process
selector, the section index in its degraded (no-observer) state, and the
screenshot dialog's open/close cycle.

`core/config/assets.spec.ts` runs against the real `public/` directory, so a
screenshot marked available while its file is missing fails there rather than
404ing in production.

## Motion

Motion is limited to four jobs: press feedback (`scale(0.97)` at 120ms), hover
and focus affordances on links, the progress rail filling in the process
selector, and the theme crossfade. There are no scroll reveals and no entrance
animations, so nothing moves while the reader is trying to read it.

All easing uses a strong ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`); nothing
uses `ease-in`, which delays the first frame the user is watching. Everything
is a CSS transition rather than a keyframe animation, so rapid interaction
retargets from the current value instead of restarting.

Hover effects are gated behind `@media (hover: hover) and (pointer: fine)`, and
`prefers-reduced-motion` narrows `transition-property` to colour and opacity so
state changes still register while movement stops.

## Content integrity

`core/i18n/translations/content-integrity.spec.ts` walks every string in both
dictionaries and asserts what must never appear: a former employer the site must
not name, healthcare or regulatory claims, the phone number, invented seniority
titles, percentage and revenue patterns, and claimed years of experience. It also
checks that the two dictionaries have identical key paths and that the prose keys
actually differ between languages, which catches a Spanish entry left in English.

This is deliberately a test rather than a review checklist: the constraint is
about facts, and facts are exactly the thing that erodes quietly during edits.

## Known trade-offs

- **Hand-written focus trap.** Less battle-tested than the CDK's, but it is
  applied to exactly one modal and avoids a dependency added for one behaviour.
- **No linter.** Prettier enforces formatting; nothing enforces code rules yet.
- **No `og:image`.** No real artwork exists and no remote asset is referenced,
  so link previews show text only until a real image is added.
- **Hand-built diagrams.** The hero pipeline and the architecture diagram are
  lists plus CSS connectors. A charting library would be a heavy dependency for
  two static diagrams, and an image would not be translatable, selectable or
  readable by assistive technology.
- **The résumé PDF is the supplied file, unmodified.** Its summary is written
  for one specific employer and names that industry. The site never does, but
  anyone who downloads the PDF will see it.
