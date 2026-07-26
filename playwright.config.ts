// Node modules
import { defineConfig, devices } from "@playwright/test";

const GALLERY_URL = "http://localhost:3100/playwright/gallery/index.html";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  projects: [
    {
      name: "components",
      testDir: "./tests/components",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: GALLERY_URL,
        serviceWorkers: "block",
        reuseContext: true,
      },
    },
  ],
  webServer: {
    command: "pnpm gallery",
    url: GALLERY_URL,
    reuseExistingServer: !process.env.CI,
  },
});
