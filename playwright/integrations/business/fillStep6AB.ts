// Node modules
import { test, type Locator } from "@playwright/test";

export default async function fillStep6AB(form: Locator) {
  await test.step("Step 6: Guarantor (AB)", async () => {
    await form.getByRole("heading", { name: "Borgensman", exact: true }).waitFor();
    await form.getByRole("button", { name: "Skicka in ansökan" }).click();
  });
}
