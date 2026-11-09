// Node modules
import { test, type Locator } from "@playwright/test";

// Project files
import checkSuccessStep from "./consumer/checkSuccessStep";
import { coApplicant, mainApplicant } from "./consumer/data/applicants";
import fillIntroStep from "./consumer/fillIntroStep";
import fillStep2 from "./consumer/fillStep2";
import fillStep3 from "./consumer/fillStep3";

// Properties
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/mvp-consumer/FormManager/Default");
});

test("Should be able to apply as a single applicant", async () => {
  await fillIntroStep(form);
  await fillStep2(form, { hasCoApplicant: "Nej" });
  await fillStep3(form, { mainApplicant });
  await checkSuccessStep(form);
});

test("Should be able to apply with a co-applicant", async () => {
  await fillIntroStep(form);
  await fillStep2(form, { hasCoApplicant: "Ja" });
  await fillStep3(form, { mainApplicant, coApplicant });
  await checkSuccessStep(form);
});
