// Node modules
import type { Page } from "@playwright/test";

type Props = {
  purpose: string;
  turnover: number;
} & ({ hasExistingLoans: false } | { hasExistingLoans: true; loanDebt: number });

export default async function fillStep4(page: Page, props: Props) {
  await page.getByRole("heading", { name: "Lånesyfte & Omsättning" }).waitFor();
  await page.getByRole("textbox", { name: "Ditt lånesyfte" }).click();
  await page.getByText(props.purpose, { exact: true }).click();
  await page.getByRole("textbox", { name: "Bolagets omsättning från juni" }).fill(String(props.turnover));
  await page
    .locator("#has_existing_loans")
    .getByText(props.hasExistingLoans ? "Ja" : "Nej", { exact: true })
    .click();
  if (props.hasExistingLoans) {
    await page.getByRole("textbox", { name: "Uppskattad total skuld på" }).fill(String(props.loanDebt));
  }
  await page.getByRole("button", { name: "Fortsätt" }).click();
}
