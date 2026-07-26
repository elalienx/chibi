// Node modules
import { defineConfig, devices } from "@playwright/test";

// Properties
const TEST_FOLDER = "./playwright";
const GALLERY_URL = "http://localhost:3100/playwright/index.html";

export default defineConfig({
  testDir: TEST_FOLDER,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  snapshotPathTemplate: "snapshots/{testFileName}/{arg}-{platform}{ext}",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "components",
      testDir: TEST_FOLDER,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 800, height: 600 },
        baseURL: GALLERY_URL,
        serviceWorkers: "block",
        reuseContext: true,
      },
    },
  ],
  webServer: {
    command: process.env.CI ? "pnpm gallery:build && pnpm gallery:preview" : "pnpm gallery:dev",
    url: GALLERY_URL,
    reuseExistingServer: !process.env.CI,
  },
});
