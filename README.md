# Steel Core Operations

Marketing site for Steel Core Operations — revenue infrastructure for coaches, consultants, and agencies.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (animations)
- lucide-react (icons)

## Run locally

```bash
npm install
npm run dev
```

Site is served at `http://localhost:3000`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
- `npm run lint` — TypeScript type-check (`tsc --noEmit`)
- `npm run clean` — remove `dist/`

## Pages

- `/` — main marketing site
- `/proposals/master-the-curriculum/` — client proposal (unlisted, noindex)

## Deploy

Deployed via Vercel. Pushing to `main` triggers a production deploy automatically.
