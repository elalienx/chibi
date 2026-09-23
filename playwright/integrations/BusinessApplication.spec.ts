// Node modules
import { test } from "@playwright/test";

// Project files
import checkSuccessStep from "./business/checkSuccessStep";
import fillIntroStep from "./business/fillIntroStep";
import fillStep1 from "./business/fillStep1";
import fillStep4 from "./business/fillStep4";

test("Should be able to submit with no debt", async ({ mount }) => {
  const form = await mount("forms/mvp-business/FormManager/Default");
  const result1 = "Your turnover is 1 000 000 kr and your existing debt is 0 kr.";

  await fillIntroStep(form);
  await fillStep1(form, { loanAmount: 600_000, loanPeriod: 2 });
  await fillStep4(form, { turnover: 1_000_000, hasExistingLoans: false });
  await checkSuccessStep(form, { result1 });
});

test("Should be able to submit with debt", async ({ mount }) => {
  const form = await mount("forms/mvp-business/FormManager/Default");
  const result1 = "Your turnover is 500 000 kr and your existing debt is 250 000 kr.";

  await fillIntroStep(form);
  await fillStep1(form, { loanAmount: 1_000_000, loanPeriod: 3 });
  await fillStep4(form, { turnover: 500_000, hasExistingLoans: true, loanDebt: 250_000 });
  await checkSuccessStep(form, { result1 });
});
