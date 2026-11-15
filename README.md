# sidequests

A small monorepo for personal apps:

- **trip-planner** — a mobile itinerary for the China trip (Beijing → Chengdu →
  Shanghai → Hangzhou) with hotels, restaurants, day-to-day plans, expenses,
  and an OpenStreetMap view.
- **personal-portfolio** — my personal website.

## Structure

```
sidequests/
├── apps/
│   ├── trip-planner/        ← itinerary app (Vite + React + TypeScript)
│   └── personal-portfolio/  ← personal website
├── index.html             ← landing page, links to each app
└── .github/workflows/     ← builds + deploys everything to GitHub Pages
```

Add future apps as new folders under `apps/` (the pnpm workspace picks up
`apps/*` automatically), and add a link to them in the root `index.html`.

## Local development

Requires [pnpm](https://pnpm.io) (`npm install -g pnpm`) and Node 20+.

```bash
pnpm install
pnpm dev:trip-planner        # http://localhost:5173/sidequests/trip-planner/
pnpm dev:personal-portfolio  # http://localhost:5173/sidequests/personal-portfolio/
```

Because of the `base` path set for GitHub Pages, the dev server serves each
app under a subpath too — open the URL it prints.

The root `index.html` (landing page) is plain static HTML, but its links only
work once the apps are built. To preview the whole site as it will appear on
GitHub Pages:

```bash
pnpm preview:site   # builds, assembles into ./site, serves http://localhost:4173/sidequests/
```

### Adding a new app

1. Create `apps/<name>/` with its own `package.json` (unique `name`),
   `vite.config.ts`, `index.html`, and `src/` — copy from `trip-planner`.
2. Set `base: "/sidequests/<name>/"` in its `vite.config.ts`.
3. Add `dev:<name>` / `build:<name>` scripts to the root `package.json`.
4. Add a link in the root `index.html`.
5. In `.github/workflows/deploy.yml`, add a build step
   (`pnpm --filter <name> build`) and copy `apps/<name>/dist/*` into
   `site/<name>/` in the "Assemble site" step.

## App docs

- [trip-planner](apps/trip-planner/README.md) — how to edit the trip data

## Deploying to GitHub Pages

1. Create a new **public** repo on GitHub named `sidequests` (matching the
   `base` path set in `apps/trip-planner/vite.config.ts` — if you use a
   different repo name, update that `base` value to match).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sidequests.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source**,
   select **GitHub Actions**.
4. Push to `main` (or re-run the workflow from the Actions tab) and the site
   builds automatically. It'll be live at:
   ```
   https://<your-username>.github.io/sidequests/
   ```
   with the trip planner at `.../sidequests/trip-planner/`.

Bookmark that URL or add it to your phone's home screen before you go — it'll
work like a lightweight app icon.
