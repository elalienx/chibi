// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  blancoLoans?: number;
  installmentLoans?: number;
  houseLoans?: number;
}

export default async function fillStep6EN(form: Locator, { blancoLoans, installmentLoans, houseLoans }: Props = {}) {
  await test.step("Step 6: Existing loans (EN)", async () => {
    await form.getByRole("heading", { name: "Befintliga lån" }).waitFor();

    // Optional loans
    if (blancoLoans !== undefined) {
      await form.getByRole("textbox", { name: "Blancolån" }).fill(String(blancoLoans));
    }

    if (installmentLoans !== undefined) {
      await form.getByRole("textbox", { name: "Avbetalningskrediter" }).fill(String(installmentLoans));
    }

    if (houseLoans !== undefined) {
      await form.getByRole("textbox", { name: "Bolån" }).fill(String(houseLoans));
    }

    await form.getByRole("button", { name: "Slutför" }).click();
  });
}
