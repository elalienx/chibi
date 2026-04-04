import { defineConfig, devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  testDir: "./",
  snapshotDir: "./__snapshots__",
  timeout: process.env.CI ? 10_000 : 1_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 8 : undefined,
  reporter: "list",
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
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
