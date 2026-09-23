// Node modules
import { test, type Locator } from "@playwright/test";

export default async function fillIntroStep(form: Locator) {
  await test.step("Intro", async () => {
    await form.getByRole("heading", { name: "Business MVP" }).waitFor();
    await form.getByRole("button", { name: "Start demo" }).click();
  });
}
