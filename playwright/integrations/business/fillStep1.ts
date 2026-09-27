// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  loanAmount?: number;
  loanPeriod?: number;
}

export default async function fillStep1(form: Locator, { loanAmount = 600_000, loanPeriod = 2 }: Props = {}) {
  await test.step("Step 1: Loan amount and period", async () => {
    await form.getByRole("textbox", { name: "Välj lånesumma:" }).fill(String(loanAmount));
    await form.getByRole("textbox", { name: "Välj lånetid:" }).fill(String(loanPeriod));
    await form.getByRole("button", { name: "Påbörja ansökan" }).click();
  });
}
