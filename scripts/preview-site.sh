#!/usr/bin/env bash
# Builds all apps and assembles them like the GitHub Pages deploy, then serves it.
# Open http://localhost:4173/sidequests/
set -euo pipefail
cd "$(dirname "$0")/.."

pnpm --filter trip-planner build
pnpm --filter personal-portfolio build

rm -rf site
mkdir -p site/sidequests/trip-planner site/sidequests/personal-portfolio
cp index.html site/sidequests/
cp -r apps/trip-planner/dist/* site/sidequests/trip-planner/
cp -r apps/personal-portfolio/dist/* site/sidequests/personal-portfolio/

echo '{"redirects":[{"source":"/","destination":"/sidequests/","type":302}]}' > site/serve.json

echo "Open http://localhost:4173/sidequests/"
npx --yes serve site -l 4173
