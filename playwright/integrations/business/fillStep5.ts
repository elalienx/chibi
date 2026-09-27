// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  purpose: string;
  details?: string;
}

export default async function fillStep5(form: Locator, { purpose, details }: Props) {
  await test.step("Step 5: Loan purpose", async () => {
    await form.getByRole("heading", { name: "Lånesyfte" }).waitFor();

    // Loan purpose
    await form.getByText(purpose).click();

    // Optional loan purpose detail
    if (details) await form.getByRole("textbox", { name: "Berätta mer" }).fill(details);

    await form.getByRole("button", { name: "Fortsätt" }).click();
  });
}
