// Node modules
import { test, type Locator } from "@playwright/test";

export default async function fillStep6EN(form: Locator) {
  await test.step("Step 6: Existing loans (EN)", async () => {
    await form.getByRole("heading", { name: "Befintliga lån" }).waitFor();
    await form.getByRole("button", { name: "Slutför" }).click();
  });
}
