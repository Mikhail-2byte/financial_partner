# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Marketing site for **«Финансовый партнёр»** — an accounting-outsourcing service for ИП/ООО based in Екатеринбург, serving clients across Russia. All UI copy, content, and source docs are in Russian.

The repo is split in two:

- **Root (`./`)** — Russian business/strategy documents that drive the site's content. Not code.
  - `STATUS.md` — session entry point. Open this first; it tracks what's done and what's next.
  - `brand-kit.md` — single source of truth for palette, typography, H1, tone of voice, dos/don'ts.
  - `finansovy_partner_research.md` — market/audience/pricing research; the source of truth for business decisions (sections referenced by number from STATUS.md).
- **`site/`** — the actual Next.js app and the only git repository in the tree. Run all dev commands from inside `site/`.

## Commands (run from `site/`)

```bash
npm run dev          # http://localhost:3000 (Turbopack by default in Next 16)
npm run build
npm start
npx eslint .         # NOTE: `next lint` was removed in Next 16 — call eslint directly
```

There is no test runner configured.

## Critical: this is Next.js 16, not the version the model remembers

Next 16 has breaking changes from earlier versions. Before writing any Next-specific code (routing, middleware, data fetching, caching), check the local upgrade guide at `site/node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`. Highlights to keep in mind:

- `params`, `searchParams`, `cookies()`, `headers()` are **async** — always `await`.
- `middleware.ts` → renamed to `proxy.ts` with a new exported function name.
- Turbopack is the default for both `dev` and `build`.
- Parallel routes require an explicit `default.js`.
- `revalidateTag` takes a required second argument: `revalidateTag('posts', 'max')`.

Heed deprecation notices in the docs — APIs from older Next versions may no longer work.

## Architecture

### Content is data, not JSX

Every section's copy lives in `site/src/content/*.ts` as typed constants. Section components import these and render them. When asked to "add a service" or "change pricing," edit the content file, not the component. Strings marked `PLACEHOLDER` in those files must be replaced before launch (`grep -rn PLACEHOLDER src/` from inside `site/`).

Current content files (15):

- Brand & navigation: `brand` (name/domain/contacts/legal)
- Home sections: `advantages`, `audiences`, `services`, `pricing`, `process`, `team`, `cases`, `testimonials`, `faq`
- About page: `about` (story + values)
- Tariffs page: `calculator` (6 steps, UI only), `one-off-services` (6 categories)
- Service landings: `landings` (dictionary keyed by slug — hero, suits, includes, priceHook, faq)
- Legal pages: `legal` (3 documents — policy, consent, offer — as structured sections/blocks)

### Routes (App Router)

10 static routes + one 301 redirect:

- `/`, `/tarify`, `/o-kompanii`, `/kontakty`
- `/uslugi/buhgalter-dlya-ip`, `/uslugi/buhgalter-dlya-ooo`, `/uslugi/nulevaya-otchetnost` — landing pages built from the universal template in `components/sections/landing.tsx` (driven by `content/landings.ts`)
- `/policy`, `/consent`, `/offer` — legal docs rendered via `components/sections/legal-document.tsx` (driven by `content/legal.ts`)
- `/uslugi` → 301 to `/tarify` (configured in `next.config.ts → redirects()`)

`Header` and `Footer` live in `components/layout/` and are mounted once in `app/layout.tsx`, along with `CookieBanner` (client component using `useSyncExternalStore` to read `localStorage` — do not use `setState` inside `useEffect`, ESLint rule `react-hooks/set-state-in-effect` will fail the build).

### Design system

- **Tailwind 4** with all design tokens defined in `@theme` inside `src/app/globals.css` — brand palette (warm green `#1A4731` + gold `#F5A623`), accent palette, semantic colors (`cream`, `ink`, `muted`, `line`), radii (`--radius-button`, `--radius-card`, `--radius-hero`), font variables, and accordion keyframes (`accordion-down/up` are declared in the same `@theme` block — Radix needs them to animate `--radix-accordion-content-height`, they are not provided by Tailwind 4 out of the box). There is **no `tailwind.config.ts`** — don't create one; extend the `@theme` block instead.
- **Fonts** are loaded once in `src/app/layout.tsx` via `next/font/google` (Manrope display + Inter body, both with `cyrillic` subset) and exposed as CSS variables.
- **UI primitives** in `src/components/ui/` (Button, Card, Container, Badge, Accordion) are **hand-written** on top of `@radix-ui/*` headless components plus `class-variance-authority` for variants. The shadcn/ui CLI is intentionally **not** used — don't run `npx shadcn add`; mirror the existing primitive pattern instead (`cva` for variants, `cn` from `@/lib/utils`, `forwardRef`, `asChild` via `@radix-ui/react-slot` where it makes sense).
- **Utilities** in `src/lib/utils.ts`: `cn()` (clsx + tailwind-merge), `formatPrice()` (ru-RU + ₽), `formatPhone()` (Russian 11-digit format).

### Path alias

`@/*` → `./src/*` (configured in `tsconfig.json`). Use it for all internal imports.

### Brand constraints when writing UI or copy

`brand-kit.md` is authoritative. Two rules that get violated easily:

- **Tone**: no corporate clichés ("динамично развивающаяся компания", "индивидуальный подход", "команда профессионалов"), no exclamation marks in headlines, no banking-jargon. Concrete numbers and timelines instead.
- **Color**: stick to the brand/accent scales defined in `@theme`. Don't introduce blue — the whole positioning is explicitly an escape from the "blue corporate" look every competitor uses.

### Design tooling available in this repo

Use these when building or refining UI — they are installed and tailored to this project:

- **`frontend-design` skill** — invoke before writing any new section/component. Forces deliberate typography/color/motion instead of default AI output.
- **`ui-ux-pro-max` skill** — invoke for design-system decisions, picking a style/layout, or a pre-launch UI quality pass. It can suggest shadcn components — ignore that suggestion here (see hand-written-primitives rule above).
- **Magic MCP (`/ui ...`)** — for scaffolding a standard marketing block (hero/pricing/testimonials) fast. Always refactor the output into the existing `cva` + Radix primitive pattern and the brand palette before committing — raw Magic output uses generic styling.
- **Chrome DevTools MCP** — after `npm run dev`, screenshot `http://localhost:3000`, read console/network, measure LCP. Use it for visual iteration (screenshot → compare → fix, ≥2 rounds) and to catch runtime errors.
- **context7 MCP** — add `use context7` to any prompt touching Next 16 / React 19 / Tailwind 4 APIs; the model's built-in knowledge of these versions is stale.

### Anti-generic design checklist (project-specific)

The brand deliberately escapes the generic-AI / blue-corporate look. When generating UI, hold to these — they override any tool's default aesthetic:

- **Fonts**: ONLY Manrope (display/H1–H4, weight 700–800) + Inter (body). Inter-for-body is an intentional brand choice here — do not "replace Inter" per generic advice, and do not introduce a third font or fall back to a system stack for headings.
- **Color**: warm green `#1A4731` (brand-700) + amber `#F5A623` (accent-400) on cream `#FAFAF7` background, text `ink #1C1C1E` (never pure `#000`). No blue, no purple gradients, no neon. Tokens live in `@theme` in `globals.css` — use those, not raw hex in components.
- **Radii**: buttons `rounded-xl`, cards `rounded-2xl`, inputs `rounded-lg`, hero images `rounded-3xl`. Shadows: cards `shadow-sm`→hover `shadow-md`.
- **No**: stock "businessmen in suits", 3D/cartoon illustrations, exclamation marks in headlines, corporate clichés. Use concrete numbers/timelines and real team/office photos.
- **Motion**: framer-motion, 200ms `easeOut`, restrained (scroll-reveal, button hover-lift). No random micro-interactions.

## Deployment notes

The site cannot be deployed to Vercel. Hosting target is Russian (TimeWeb Cloud / Selectel) to meet 152-ФЗ requirements for personal data processed by the lead form. Keep this in mind for any deployment-related code (no Vercel-only APIs, no edge runtime assumptions tied to Vercel infrastructure).

## How to orient a new session

Read `STATUS.md` first — it lists the current phase, what's done, what's in progress, and the next concrete step. The implementation plan lives at `~/.claude/plans/golden-frolicking-firefly.md` and tracks remaining work as numbered tasks.
