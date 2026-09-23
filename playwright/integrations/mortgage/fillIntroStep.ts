// Node modules
import { test, type Page } from "@playwright/test";

export default async function fillIntroStep(page: Page) {
  await test.step("Introduction", async () => {
    await page.getByRole("heading", { name: "Mortgage MVP" }).waitFor();
    await page.getByRole("button", { name: "Next" }).click();
  });
}
