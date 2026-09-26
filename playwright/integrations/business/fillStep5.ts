// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  purpose: string;
}

export default async function fillStep5(form: Locator, { purpose }: Props) {
  await test.step("Step 5: Loan purpose", async () => {
    await form.getByRole("heading", { name: "Lånesyfte", exact: true }).waitFor();
    await form.getByRole("radio", { name: purpose, exact: true }).check();
    await form.getByRole("button", { name: "Fortsätt", exact: true }).click();
  });
}
