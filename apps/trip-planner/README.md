# trip-planner

Mobile itinerary for the China trip (Vite + React + TypeScript).

Run locally from the repo root: `pnpm dev:trip-planner`.

## Editing your trip data

All trip content lives in one file:

```
src/data/trip.ts
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
