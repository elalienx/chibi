// Node modules
import { expect, test, type Locator } from "@playwright/test";

// Project files
import checkSuccessStep from "./business/checkSuccessStep";
import fillStep1 from "./business/fillStep1";
import fillStep2 from "./business/fillStep2";
import fillStep3 from "./business/fillStep3";
import fillStep4 from "./business/fillStep4";
import fillStep5 from "./business/fillStep5";

let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/mvp-business/FormManager/Default");
});

test("Should be able to submit with no debt", async () => {
  const result = "Your turnover is 1 000 000 kr and your existing debt is 0 kr.";

  await fillStep1(form);
  await fillStep2(form, { email: "anna@example.com", phone: "+46 70 123 45 67" });
  await fillStep3(form, { company: "Connys & Sjukvård AB" });
  await fillStep4(form, { turnover: 1_000_000, hasExistingLoans: false });
  await fillStep5(form, { purpose: "Renovering av lokal" });
  await checkSuccessStep(form, { result: result });
});

test("Should be able to submit with debt", async () => {
  const result = "Your turnover is 500 000 kr and your existing debt is 250 000 kr.";

  await fillStep1(form);
  await fillStep2(form, { email: "erik@example.com", phone: "0707654321" });
  await fillStep3(form, { company: "Birgers Guldsmedja AB" });
  await fillStep4(form, { turnover: 500_000, hasExistingLoans: true, loanDebt: 250_000 });
  await fillStep5(form, { purpose: "Renovering av lokal", details: "Nytt golv i lokalen" });
  await checkSuccessStep(form, { result: result });
});

test("Should not close the loan details sub-form if there is an error", async () => {
  await fillStep1(form);

  await test.step("Step 2: Person information", async () => {
    await form.getByRole("heading", { name: "Personuppgifter" }).waitFor();
    await form.getByRole("button", { name: "Ändra" }).click();

    await test.step("Sub-form", async () => {
      const longTerm = 10;

      await form.getByRole("textbox", { name: "Lånetid:" }).fill(String(longTerm));
      await form.getByRole("textbox", { name: "Lånetid:" }).blur();
      await form.getByRole("button", { name: "Okej" }).click();
      await expect(form.getByRole("textbox", { name: "Lånetid:" })).toBeVisible();
      await expect(form.getByText("Måste vara maximalt 5 år.")).toBeVisible();

      await form.getByRole("textbox", { name: "Lånetid:" }).fill("2");
      await form.getByRole("textbox", { name: "Lånetid:" }).blur();
      await expect(form.getByText("Måste vara maximalt 5 år.")).not.toBeVisible();
      await form.getByRole("button", { name: "Okej" }).click();
      await expect(form.getByRole("button", { name: "Ändra" })).toBeVisible();
    });
  });
});
