// Node modules
import { test, type Locator } from "@playwright/test";

type Props = {
  purpose?: string;
  turnover: number;
} & ({ hasExistingLoans: false } | { hasExistingLoans: true; loanDebt: number });

export default async function fillStep4(form: Locator, props: Props) {
  const { purpose = "Renovering av lokal" } = props;

  await test.step("Step 4: About the company", async () => {
    await form.getByRole("heading", { name: "Lånesyfte & Omsättning" }).waitFor();
    await form.getByRole("textbox", { name: "Ditt lånesyfte" }).click();
    await form.getByText(purpose, { exact: true }).click();
    await form.getByRole("textbox", { name: "Bolagets omsättning från juni" }).fill(String(props.turnover));
    await form
      .locator("#has_existing_loans")
      .getByText(props.hasExistingLoans ? "Ja" : "Nej", { exact: true })
      .click();
    if (props.hasExistingLoans) {
      await form.getByRole("textbox", { name: "Uppskattad total skuld på" }).fill(String(props.loanDebt));
    }
    await form.getByRole("button", { name: "Fortsätt" }).click();
  });
}
