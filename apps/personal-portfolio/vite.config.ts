import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served at https://<username>.github.io/sidequests/personal-portfolio/
export default defineConfig({
  base: "/sidequests/personal-portfolio/",
  plugins: [react()],
});
