// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  turnover: number;
  hasExistingLoans: boolean;
  loanDebt?: number;
}

export default async function fillStep4(form: Locator, { turnover, hasExistingLoans, loanDebt }: Props) {
  await test.step("Step 4: About the company", async () => {
    // Safeguards
    if (hasExistingLoans && loanDebt === undefined) throw new Error("Pass loanDebt when hasExistingLoans is true.");
    if (!hasExistingLoans && loanDebt !== undefined) throw new Error("Pass loanDebt when hasExistingLoans is true.");

    await form.getByRole("heading", { name: "Lånesyfte & Omsättning" }).waitFor();

    await form.getByRole("textbox", { name: "Bolagets omsättning från juni" }).fill(String(turnover));

    if (hasExistingLoans) {
      await form.locator("#has_existing_loans").getByText("Ja").click();
    }

    if (!hasExistingLoans) {
      await form.locator("#has_existing_loans").getByText("Nej").click();
    }

    if (loanDebt !== undefined) {
      await form.getByRole("textbox", { name: "Uppskattad total skuld på" }).fill(String(loanDebt));
    }

    await form.getByRole("button", { name: "Fortsätt" }).click();
  });
}
