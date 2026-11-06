// Node modules
import { expect, test, type Locator } from "@playwright/test";

/**
 * The demo ends after Step 3 because Step 4 is not built yet.
 * Leaving Step 3 means all its fields passed validation.
 */
export default async function checkEndOfDemo(form: Locator) {
  await test.step("End of demo", async () => {
    await expect(form.getByRole("heading", { name: "Personuppgifter" })).toBeHidden();
  });
}
