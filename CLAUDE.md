# mandor-web — Project rules (binding)

Promotional website for **Mandor** (Claude Code agents on one board, synced with Lark Base).
The design source is `docs/design/mandor-design/mandor-design-handoff/prototype/landing.html`
in the `mandor` repo; this site follows it.

## Standard: `nextjs-engineering`

**Every change follows the `nextjs-engineering` skill.** Load it before writing, changing,
or reviewing code, or adding a dependency, and read the guide for what you touch.

- **Kind:** production app. All non-negotiables apply.
- **UI library:** shadcn/ui (Base UI primitives) + Tailwind v4, wrapped in `src/components/ui`.
  Icons: Lucide, re-exported from `src/components/ui/icons.ts`. ESLint bans importing
  `@base-ui/*`, `lucide-react`, and other UI kits outside `src/components/ui`.
- **Design tokens:** `src/app/globals.css` (`:root` values from the prototype's `mandor.css`,
  dark theme only). No hard-coded colours in features; use the token utilities.
- **Architecture:** `app/` thin; `features/` (landing, demo, waitlist) imported only through
  their `index.ts`; generic UI in `components/ui` (atoms) and `components/molecules`.
- **Package manager:** pnpm. Gate: `pnpm check` (typecheck, lint, format, test + coverage,
  build). E2E: `pnpm test:e2e` against a production build.
- Test-first: behaviour is driven by Vitest + Testing Library tests; critical journeys
  (page load, demo, waitlist, mobile fit) have Playwright e2e.

## Docs

User docs live at `/docs` as MDX pages under `src/app/docs/**/page.mdx`. The table of contents
(sidebar, Previous/Next) is `src/features/docs/model/nav.ts`; add every new page there. The
content follows the `mandor` repo's README and `docs/runbook/*`; keep them in step.

## SEO

`SITE_URL` (e.g. `https://mandor.dev`) is the site's public origin, read once in `src/lib/site.ts`
and validated there. It sets `metadataBase`, canonical URLs, `sitemap.xml`, `robots.txt`, and the
JSON-LD URLs; **set it in every production build**. Unset, it falls back to `http://localhost:3000`
and the build warns. Builders live in `src/features/seo`: each docs page's metadata comes from
`docMetadata(href)`, whose title and description are in the docs table of contents, so a new page
needs a `description` there. The 404 page is `noindex`.

## Dependencies beyond the allow list

| Package                                                      | Why                                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` | The documentation pages are written in MDX, the official Next.js way |
| `remark-gfm`                                                 | Markdown tables in the docs                                          |

## Decisions (do not re-ask)

- **Waitlist has no backend.** The form validates the email and says sign-ups are not open
  yet; nothing is sent. Adding a backend is a product decision.
- **CSP without nonces.** The page is fully static and renders no user-supplied content, so
  the CSP in `next.config.ts` is static (`'self'` everywhere) with `'unsafe-inline'` for
  Next's own inline bootstrap scripts. Nonces would force dynamic rendering. Revisit when
  the site renders any user or third-party content.
- **Fonts:** Space Grotesk and JetBrains Mono, latin subset only, self-hosted via
  `next/font/local` (no third-party font requests).
- **Copy:** English. Roadmap reflects the current state: Releases 1 and 2 available,
  Release 3 (AI Lembur) in testing.
