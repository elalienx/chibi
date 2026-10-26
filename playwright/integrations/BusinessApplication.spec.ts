// Node modules
import { test, type Locator } from "@playwright/test";

// Project files
import exampleSSNs from "../../src/forms/mvp-business/-bank-id-login/exampleSSNs";
import checkSuccessStep from "./business/checkSuccessStep";
import fillBankIDLogin from "./business/fillBankIDLogin";
import fillStep1 from "./business/fillStep1";
import fillStep2 from "./business/fillStep2";
import fillStep3 from "./business/fillStep3";
import fillStep4 from "./business/fillStep4";
import fillStep5 from "./business/fillStep5";
import fillStep6AB from "./business/fillStep6AB";
import fillStep6EN from "./business/fillStep6EN";

// Properties
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/mvp-business/FormManager/Default");
});

test("Should be able to submit with no debt", async () => {
  const result = "Your turnover is 1 000 000 kr and your existing debt is 0 kr.";

  await fillStep1(form);
  await fillStep2(form, { email: "anna@example.com", phone: "+46 70 123 45 67" });
  await fillBankIDLogin(form, { ssn: exampleSSNs.MULTIPLE_PUBLIC_COMPANIES });
  await fillStep3(form, { company: "Connys & Sjukvård AB" });
  await fillStep4(form, { turnover: 1_000_000, hasExistingLoans: false });
  await fillStep5(form, { purpose: "Renovering av lokal" });
  await fillStep6AB(form);
  await checkSuccessStep(form, { result: result });
});

test("Should be able to submit with debt", async () => {
  const result = "Your turnover is 500 000 kr and your existing debt is 250 000 kr.";

  await fillStep1(form);
  await fillStep2(form, { email: "erik@example.com", phone: "0707654321" });
  await fillBankIDLogin(form, { ssn: "199001011234" }); // Any other personnummer shows the company selector.
  await fillStep3(form, { company: "Birgers Guldsmedja AB" });
  await fillStep4(form, { turnover: 500_000, hasExistingLoans: true, loanDebt: 250_000 });
  await fillStep5(form, { purpose: "Renovering av lokal", details: "Nytt golv i lokalen" });
  await fillStep6AB(form);
  await checkSuccessStep(form, { result: result });
});

test("Should skip the company selector for a single public company", async () => {
  const result = "Your turnover is 1 000 000 kr and your existing debt is 0 kr.";

  await fillStep1(form);
  await fillStep2(form, { email: "anna@example.com", phone: "+46 70 123 45 67" });
  await fillBankIDLogin(form, { ssn: exampleSSNs.SINGLE_PUBLIC_COMPANY });
  await fillStep4(form, { turnover: 1_000_000, hasExistingLoans: false });
  await fillStep5(form, { purpose: "Renovering av lokal" });
  await fillStep6AB(form);
  await checkSuccessStep(form, { result: result });
});

test("Should skip the company selector and show existing loans for a sole trader", async () => {
  const result = "Your turnover is 1 000 000 kr and your existing debt is 0 kr.";

  await fillStep1(form);
  await fillStep2(form, { email: "anna@example.com", phone: "+46 70 123 45 67" });
  await fillBankIDLogin(form, { ssn: exampleSSNs.SOLE_TRADER });
  await fillStep4(form, { turnover: 1_000_000, hasExistingLoans: false });
  await fillStep5(form, { purpose: "Renovering av lokal" });
  await fillStep6EN(form);
  await checkSuccessStep(form, { result: result });
});
