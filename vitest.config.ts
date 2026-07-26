// Node modules
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // `tests/` holds Playwright component specs (import from @playwright/test);
    // keep them out of the Vitest run.
    exclude: ["node_modules/**", "tests/**", "playwright/**"],
  },
});
