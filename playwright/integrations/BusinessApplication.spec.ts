// Node modules
import { expect, test } from "@playwright/test";

// Project files
import fillIntroStep from "./business/fillIntroStep";
import fillStep1 from "./business/fillStep1";
import fillStep4 from "./business/fillStep4";

test("Should be able to submit with no debt", async ({ mount, page }) => {
  const form = await mount("forms/mvp-business/FormManager/Default");

  await test.step("Intro", async () => {
    await fillIntroStep(page);
  });

  await test.step("Step 1: Loan amount and period", async () => {
    await fillStep1(page, { loanAmount: 600_000, loanPeriod: 2 });
  });

  await test.step("Step 4: About the company", async () => {
    await fillStep4(page, {
      purpose: "Renovering av lokal",
      turnover: 1_000_000,
      hasExistingLoans: false,
    });
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("Your turnover is 1 000 000 kr and your existing debt is 0 kr.")).toBeVisible();
  });
});

test("Should be able to submit with debt", async ({ mount, page }) => {
  const form = await mount("forms/mvp-business/FormManager/Default");

  await test.step("Intro", async () => {
    await fillIntroStep(page);
  });

  await test.step("Step 1: Loan amount and period", async () => {
    await fillStep1(page, { loanAmount: 1_000_000, loanPeriod: 3 });
  });

  await test.step("Step 4: About the company", async () => {
    await fillStep4(page, {
      purpose: "Renovering av lokal",
      turnover: 500_000,
      hasExistingLoans: true,
      loanDebt: 250_000,
    });
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("Your turnover is 500 000 kr and your existing debt is 250 000 kr.")).toBeVisible();
  });
});
