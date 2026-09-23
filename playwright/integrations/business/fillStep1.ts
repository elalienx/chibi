// Node modules
import type { Page } from "@playwright/test";

interface Props {
  loanAmount: number;
  loanPeriod: number;
}

export default async function fillStep1(page: Page, { loanAmount, loanPeriod }: Props) {
  await page.getByRole("textbox", { name: "Välj lånesumma:" }).fill(String(loanAmount));
  await page.getByRole("textbox", { name: "Välj lånetid:" }).fill(String(loanPeriod));
  await page.getByRole("button", { name: "Påbörja ansökan" }).click();
}
