// Node modules
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standalone dev server for the Playwright component-testing gallery.
// Astro's dev server routes HTML through its own middleware, so the gallery
// gets its own small Vite server. The `*` -> `src/*` alias mirrors the app's
// tsconfig so stories/gallery can import as `components/...` and `styles/...`.
const src = fileURLToPath(new URL("../src", import.meta.url));
const playwrightDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: playwrightDir, // Now root contains index.html
  plugins: [react()],
  resolve: {
    alias: [{ find: /^(components|styles|helpers|state|layouts)\//, replacement: `${src}/$1/` }],
  },
  server: { port: 3100 },
  preview: { port: 3100 },
});
