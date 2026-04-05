import { defineConfig, devices } from "@playwright/experimental-ct-react";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// Properties
const findFilesInsideSourceFolder = { "@": resolve(process.cwd(), "src") };
const astroConfig = { resolve: { alias: findFilesInsideSourceFolder } };

export default defineConfig({
  testDir: "./",
  snapshotDir: "./__snapshots__",
  timeout: process.env.CI ? 10_000 : 1_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 8 : undefined,
  reporter: "list",
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
    ctViteConfig: {
      plugins: [tsconfigPaths()],
    },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 800, height: 600 },
      },
    },
  ],
});
