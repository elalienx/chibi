// Node modules
import { test, type Locator } from "@playwright/test";

export default async function fillIntroStep(form: Locator) {
  await test.step("Introduction", async () => {
    await form.getByRole("heading", { name: "Consumer MVP" }).waitFor();
    await form.getByRole("button", { name: "Next" }).click();
  });
}
