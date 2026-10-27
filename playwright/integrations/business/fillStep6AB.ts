// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  isGuarantor?: boolean;
}

export default async function fillStep6AB(form: Locator, { isGuarantor }: Props = {}) {
  await test.step("Step 6: Guarantor (AB)", async () => {
    await form.getByRole("heading", { name: "Borgensman", exact: true }).waitFor(); // the exact is needed as there is a subtitle containing Borgensman

    // Is guarantor?
    if (isGuarantor) await form.getByRole("radio", { name: "Jag vill gå i personlig borgen." }).check();
    if (!isGuarantor) await form.getByRole("radio", { name: "Jag vill uppge en borgensman senare." }).check();

    await form.getByRole("button", { name: "Skicka in ansökan" }).click();
  });
}
