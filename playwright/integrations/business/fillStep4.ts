// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  turnover: number;
  hasExistingLoans: boolean;
  loanDebt?: number;
}

export default async function fillStep4(form: Locator, { turnover, hasExistingLoans, loanDebt }: Props) {
  await test.step("Step 4: About the company", async () => {
    await form.getByRole("heading", { name: "Omsättning" }).waitFor();

    // Turnover
    await form.getByRole("textbox", { name: "Bolagets omsättning från juni" }).fill(String(turnover));

    // Has existing loans?
    if (hasExistingLoans) await form.locator("#has_existing_loans").getByText("Ja").click();
    if (!hasExistingLoans) await form.locator("#has_existing_loans").getByText("Nej").click();

    // Loan Debt
    if (loanDebt !== undefined) await form.getByRole("textbox", { name: "Uppskattad total" }).fill(String(loanDebt));

    await form.getByRole("button", { name: "Fortsätt" }).click();
  });
}
