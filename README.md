# Saif: portfolio

Personal portfolio of **Shaik Saifur Rahman (Saif)**, a B.Tech student in AI & Data Science. It's built with Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, GSAP and React Three Fiber.

Every project claim lives in a typed data layer (`src/data/projects.ts`) with an evidence level of `verified`, `reported` or `unverified`. Only the first two are rendered. How each claim was checked is written up in [`docs/EVIDENCE.md`](docs/EVIDENCE.md).

## Requirements

- Node.js 20.9+ (developed on Node 22)
- npm 10+

## Install and run

```bash
npm ci
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

## Scripts

| Command                           | What it does                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                     | Development server                                                                                                                    |
| `npm run build`                   | Production build                                                                                                                      |
| `npm start`                       | Serve the production build                                                                                                            |
| `npm run lint`                    | ESLint (Next core-web-vitals + TypeScript)                                                                                            |
| `npm run typecheck`               | `tsc --noEmit`                                                                                                                        |
| `npm run format` / `format:check` | Prettier (with the Tailwind class-sorting plugin)                                                                                     |
| `npm run test:e2e`                | Playwright smoke tests against `next start` (run `npm run build` first; install browsers once with `npx playwright install chromium`) |
| `npm run check`                   | lint + typecheck + build                                                                                                              |

## Environment variables

All are optional. Without them the site still builds and runs.

| Variable               | Purpose                                                                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public origin, e.g. `https://saif.dev`, with no trailing slash. Enables canonical URLs, `sitemap.xml` entries and absolute Open Graph URLs. If it's unset they're omitted, not guessed. |
| `RESEND_API_KEY`       | Resend API key for the contact form.                                                                                                                                                    |
| `CONTACT_TO_EMAIL`     | Inbox that receives contact messages.                                                                                                                                                   |
| `RESEND_FROM_EMAIL`    | Sender address on a domain verified in Resend. Defaults to `onboarding@resend.dev`, which only delivers to your own Resend account email.                                               |

If `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing, the contact page says **"Contact form not configured"** and disables the form. It never reports a success that didn't happen. The success state only appears after Resend returns an email id.

The contact route (`src/app/api/contact/route.ts`) validates input with the Zod schema it shares with the client (`src/lib/validation.ts`), rejects a filled honeypot, and rate-limits each IP to 5 requests per 10 minutes. That limiter is in memory, per serverless instance (see `src/lib/rate-limit.ts`). For stronger guarantees, swap in a shared store such as Upstash Redis.

## Editing content

- **Personal details**: `src/data/site-config.ts`. Set `email`, `linkedinUrl` and `availability`. Missing values hide the control or render it disabled.
- **Résumé**: put the PDF at `public/resume/Shaik-Saifur-Rahman-Resume.pdf`. The download button turns itself on at build time.
- **Projects**: `src/data/projects.ts`. Tag every new claim with its evidence level, and add `repoUrl` / `demoUrl` only when they really exist.
- **Skills**: `src/data/skills.ts` uses familiarity groups, not percentages.

## Structure

```
src/
  app/            routes: /, /projects, /projects/[slug], /about, /contact, 404, api/contact, sitemap, robots, OG image
  components/
    layout/       header, mobile nav, footer
    sections/     home sections, contact form
    projects/     project index, disclaimers, status, per-project visuals
    three/        hero scene (R3F), capability-gated, with SVG fallback
    ui/           buttons, headings, scroll reveal
  data/           typed content: site config, projects, skills, navigation
  lib/            evidence filter, validation, rate limit, capability detection, motion constants
  styles/         design tokens (Tailwind v4 @theme)
tests/            Playwright smoke tests
```

## 3D hero

The hero object is procedural: two tori and a torus knot, no model files. The scene is code-split with `next/dynamic` (`ssr: false`) and only starts after the browser goes idle. An SVG poster shows while it loads, when WebGL is missing, or if the scene throws an error.

Quality tier is chosen from capabilities only (WebGL support, `prefers-reduced-motion`, `hardwareConcurrency`, viewport width, pointer type). DPR is capped at 1.75 on capable devices and 1.25 on lower tiers. Rendering pauses when the hero is off-screen, and geometries and materials are disposed on unmount. With reduced motion turned on, the object is drawn once in a static pose, with no rotation, parallax or scroll transform.

## Deploying to Vercel

1. Push this repository to GitHub and import it at <https://vercel.com/new>. The framework preset is detected as Next.js, and the default build (`npm run build`) and output settings are fine.
2. In **Project → Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` and, for the contact form, `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and optionally `RESEND_FROM_EMAIL`.
3. Deploy. Environment variables are read at build time for the static contact page, so redeploy after changing them.
4. In Resend, verify the sending domain before setting `RESEND_FROM_EMAIL`.

Or use the CLI: `npm i -g vercel && vercel link && vercel --prod`.
