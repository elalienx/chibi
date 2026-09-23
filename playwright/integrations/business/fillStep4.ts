// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  purpose?: string;
  turnover: number;
  hasExistingLoans: boolean;
  loanDebt?: number;
}

const DEFAULT_PURPOSE = "Renovering av lokal";

export default async function fillStep4(form: Locator, { purpose, turnover, hasExistingLoans, loanDebt }: Props) {
  await test.step("Step 4: About the company", async () => {
    // Safeguards
    if (hasExistingLoans && loanDebt === undefined) throw new Error("Pass loanDebt when hasExistingLoans is true.");
    if (!hasExistingLoans && loanDebt !== undefined) throw new Error("Pass loanDebt when hasExistingLoans is true.");

    await form.getByRole("heading", { name: "Lånesyfte & Omsättning" }).waitFor();

    await form.getByRole("textbox", { name: "Ditt lånesyfte" }).click();
    await form.getByText(purpose || DEFAULT_PURPOSE).click();
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
