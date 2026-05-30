// Node modules
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["playwright/**", "node_modules/**"],
  },
});
