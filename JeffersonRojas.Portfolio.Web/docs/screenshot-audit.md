# Product screenshot audit

Two galleries, both on the home page's Projects section. Sources are the PNG
folders at the repo root; everything published is WebP under
`public/images/projects/<project>/`, named after the id that references it.

Every capture is a 1672×941 window, so a single width/height pair covers all of
them.

## LuxuryCloud — 10 of 10 published

The tenant owner authorised publishing the operational and financial data, so no
figure, chart or total was altered — the numbers on screen are the real ones.
Personal data was replaced anyway, and replaced **in the image files
themselves**: each region was repainted with its own background colour and the
substitute string drawn back on the same baseline. Nothing is blurred,
pixelated or covered by a CSS filter, because a filter is a presentation layer
and the underlying bytes would still carry the original text.

### What was replaced

| Class | Replaced with |
|---|---|
| Client names | `Cliente Demo 01` … `14` |
| Collaborator names | `Colaborador 01` … `04` |
| Avatar initials | The matching number |

The collaborator mapping is stable across every capture: the person who is
`Colaborador 02` in the charges ledger is `Colaborador 02` in the payroll, the
calendar and the analytics axis. Avatar discs keep their original colour — the
disc is sampled from a ring just inside its edge, because sampling the middle
returns the glyph and repaints a pink avatar white.

Staff phone numbers arrived already anonymised (`000`, `00000`) and were left
alone. Financial figures, commission rates, dates, service names, product names
and the business's own name are all as captured.

### Per file

| Source | Published as | Edits |
|---|---|---|
| `Dashboard financiero.png` | `dashboard.webp` | none |
| `Dashboard informativo.png` | `analytics.webp` | 4 chart axis labels |
| `Calendario.png` | `calendar.webp` | 4 client names, 4 collaborator lines, 4 avatars |
| `Calendario dia.png` | `calendar-day.webp` | 4 column headers, 7 appointment names, 4 avatars |
| `Ingresos.png` | `income.webp` | 7 client names, 7 collaborator cells |
| `Productos.png` | `products.webp` | none |
| `Funcionarios.png` | `staff.webp` | 4 names, 4 avatars |
| `Planilla.png` | `payroll.webp` | 2 card headers, 2 avatars |
| `Configuración pagina publica.png` | `public-site-editor.webp` | 3 photographs painted out |
| `Pagina publica para cada tenant.png` | `public-site.webp` | none |

`public-site-editor` is the one capture where something other than text was
removed. Its uploads panel showed photographs of customers. The owner's
authorisation covers the business's own data, not the likeness of the people in
its uploads, so those three frames were repainted flat and labelled — the editor
still shows exactly how the page is configured, without publishing anyone's
face. The storefront photo, which has no people in it, was kept.

## NexoPOS — 6 of 7 published

**Nothing was redacted, and nothing needed to be.** The application runs on a
purpose-built demo dataset and says so in its own chrome: a "Datos de
demostración" badge in the header and again in the sidebar, "Grupo Veterinario
Demo" as the organisation, invented branch names and sequential placeholder
phone numbers (`2222-1001`, `-1002`, `-1003`). The only real name on screen is
the portfolio owner's own, as the signed-in administrator.

| Source | Published as |
|---|---|
| `Resumen general.png` | `overview.webp` |
| `Sucursales.png` | `branches.webp` |
| — | `inventory.webp` **(missing)** |
| `Servicios y paquetes.png` | `services.webp` |
| `Botiquines moviles.png` | `mobile-kits.webp` |
| `Facturación.png` | `billing.webp` |
| `Reposición.png` | `restocking.webp` |

`inventory` is declared in the config with `available: false` and has its copy
written in both languages. No capture for it was supplied. The galleries drop
unavailable entries, so it simply does not appear; committing
`nexopos/inventory.webp` is the only step left to bring it in, in position 3.

These captures are light-themed while the portfolio's default is dark. That is
what the product looks like, so it is left alone; the screenshot frame carries
the separation.

## Format

WebP at quality 0.95, encoded from the redacted canvas. 16 files, 1.8MB total —
the largest is `overview.webp` at 159KB.

## Placement and loading

| Gallery | Order | Loading |
|---|---|---|
| LuxuryCloud, beside its description | dashboard → analytics → calendar → calendar-day → income → products → staff → payroll → public-site-editor → public-site | first eager, `fetchpriority="high"` |
| NexoPOS, under its card | overview → branches → services → mobile-kits → billing → restocking | all lazy |

Each gallery shows one capture at a time and prefetches only its two
neighbours, so a first paint of the page pulls three images rather than sixteen.
Every capture is rendered by `app-screenshot`: a `<figure>` with real
`width`/`height` attributes, `width: 100%`, `height: auto`,
`object-fit: contain`, localized `alt` and `figcaption`, and a native `<dialog>`
for the full-size view. Nothing is cropped by CSS.

PersonalOS has no captures and is given no gallery. An empty frame is not a
placeholder, it is a defect that has been styled.

## Reproducing a redaction

The originals are untouched. The redaction runs in a canvas: detect the ink
bands inside a rectangle, take the modal colour of that rectangle as the
background, repaint the band, then draw the replacement on the baseline the
original text sat on. Where the text fills its own rectangle so completely that
the ink is the most common colour in it — white on a red appointment card — the
background is sampled from a neighbouring empty region instead.

`assets.spec.ts` runs against the real `public/` directory: it fails if an entry
is marked available while its file is missing, if two ids collide across
projects, or if a folder holds a capture nothing references.
