import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served at https://<username>.github.io/sidequests/trip-planner/
// If you rename the repo, update this base to match.
export default defineConfig({
  base: "/sidequests/trip-planner/",
  plugins: [react()],
});
