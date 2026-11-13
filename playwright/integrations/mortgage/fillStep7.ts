// Node modules
import { test, type Locator } from "@playwright/test";

export default async function fillStep7(form: Locator) {
  await test.step("Step 7: Household", async () => {
    await form.getByRole("heading", { name: "Om hushållet" }).waitFor();
    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
