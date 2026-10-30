# mandor-web

Promotional site for Mandor, built with Next.js (App Router), Tailwind v4, and shadcn/ui.

```sh
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # typecheck, lint, format, unit tests with coverage, production build
pnpm test:e2e     # Playwright against a production build (desktop and mobile)
```

Production builds need the public origin, used for canonical URLs, `sitemap.xml`, and
`robots.txt`:

```sh
SITE_URL=https://mandor.dev pnpm build
```

Structure:

- `src/app` — layout, page, 404, error (thin)
- `src/features/landing` — page sections
- `src/features/demo` — the playable board in the hero (pure reducer in `model/demo.ts`)
- `src/features/waitlist` — early access form (no backend yet)
- `src/features/docs` — docs table of contents, sidebar, pager (pages are MDX in `src/app/docs`)
- `src/features/seo` — metadata, sitemap, robots, and JSON-LD builders
- `src/components/ui` — design-system atoms over shadcn/ui; `components/molecules` — shared pieces
