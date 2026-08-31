# sidequests

A small monorepo for personal apps. First one up: **trip-planner**, a mobile
itinerary for the China trip (Beijing → Chengdu → Shanghai → Hangzhou) with
hotels, restaurants, day-to-day plans, expenses, and an OpenStreetMap view.

## Structure

```
sidequests/
├── apps/
│   └── trip-planner/     ← itinerary app (Vite + React + TypeScript)
├── index.html             ← landing page, links to each app
└── .github/workflows/     ← builds + deploys everything to GitHub Pages
```

Add future apps as new folders under `apps/`, and add a link to them in the
root `index.html`.

## Local development

Requires [pnpm](https://pnpm.io) (`npm install -g pnpm`) and Node 20+.

```bash
pnpm install
pnpm dev:trip-planner
```

Because of the `base` path set for GitHub Pages, the dev server serves the
app under a subpath too — open the URL it prints, which will look like
`http://localhost:5173/sidequests/trip-planner/`.

## Editing your trip data

All trip content lives in one file:

```
apps/trip-planner/src/data/trip.ts
```

It's currently filled with placeholder dates/hotels/restaurants — replace
them with your real details (or just tell Claude the updates in chat and
ask it to regenerate this file). Each day has:

- `bookings` — hotels and restaurants, with address, dates/times,
  confirmation number, and cost
- `experiences` — things you're doing that day
- `expenses` — anything else you spent money on

Add `coordinates: { lat, lng }` to any booking or experience to have it show
up as a pin on the Map tab.

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
