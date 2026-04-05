import { defineConfig, devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  testDir: "./",
  snapshotDir: "./__snapshots__",
  timeout: 1_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
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
