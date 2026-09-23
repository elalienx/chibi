// Node modules
import { test, type Page } from "@playwright/test";

export default async function fillIntroStep(page: Page) {
  await test.step("Intro", async () => {
    await page.getByRole("heading", { name: "Business MVP" }).waitFor();
    await page.getByRole("button", { name: "Start demo" }).click();
  });
}
