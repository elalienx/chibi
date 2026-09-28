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

test("Should validate and save edited loan details without submitting personal details", async () => {
  await fillStep1(form);
  await form.getByRole("textbox", { name: "E-postadress" }).fill("anna@example.com");
  await form.getByRole("button", { name: "Ändra", exact: true }).click();

  const editor = form.locator("#loan-details-edit");
  await editor.getByRole("textbox", { name: "Lånesumma:" }).fill("1");
  await editor.getByRole("button", { name: "Okej" }).click();
  await expect(editor).toBeVisible();
  await expect(editor.getByText("Måste vara minst 50 000 kr.")).toBeVisible();

  await editor.getByRole("textbox", { name: "Lånesumma:" }).fill("800000");
  await editor.getByRole("textbox", { name: "Lånetid:" }).fill("3");
  await editor.getByRole("button", { name: "Okej" }).click();
  await expect(editor).toHaveCount(0);
  await expect(form.locator("#loan-details-view")).toContainText("800000 kr");
  await expect(form.locator("#loan-details-view")).toContainText("3 år");
  await expect(form.getByRole("textbox", { name: "E-postadress" })).toHaveValue("anna@example.com");
  await expect(form.getByRole("heading", { name: "Personuppgifter" })).toBeVisible();

  await form.getByRole("button", { name: "Ändra", exact: true }).click();
  await expect(editor.getByRole("textbox", { name: "Lånesumma:" })).toHaveValue("800 000");
  await expect(editor.getByRole("textbox", { name: "Lånetid:" })).toHaveValue("3");
});
