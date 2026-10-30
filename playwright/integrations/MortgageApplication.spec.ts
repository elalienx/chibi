// Node modules
import { test, type Locator } from "@playwright/test";

// Project files
import checkSuccessStep from "./mortgage/checkSuccessStep";
import fillIntroStep from "./mortgage/fillIntroStep";
import fillStep1 from "./mortgage/fillStep1";
import fillStep2 from "./mortgage/fillStep2";
import fillStep3 from "./mortgage/fillStep3";
import fillStep5 from "./mortgage/fillStep5";

// Properties
let form: Locator;

const mainApplicant = {
  civilState: "Gift",
  email: "anna@example.com",
  phone: "+46 70 123 45 67",
  employmentType: "Fast anställning / tillsvidare",
};

const mainEmployment = {
  employer: "Lendo AB",
  sinceYear: 2020,
  sinceMonth: "Mars",
  monthlyIncome: 45_000,
  profession: "Sjuksköterska",
  foreignCurrency: "Nej",
} as const;

// The mortgage journeys have up to 6 steps, more than the global 1 second allows.
test.describe.configure({ timeout: 3_000 });

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/mvp-mortgage/FormManager/Default");
});

test.describe("Single applicant", () => {
  test("Should be able to apply for a house", async () => {
    const result1 = "You choose a 100m house with 4 rooms";
    const result2 = "Therefore your operating cost is 10 000 SEK";

    await fillIntroStep(form);
    await fillStep1(form, { propertyType: "Villa" });
    await fillStep2(form, { squareMeters: 100, rooms: 4, operatingCost: 10_000 });
    await fillStep3(form, { ...mainApplicant, hasCoApplicant: "Nej" });
    await fillStep5(form, mainEmployment);
    await checkSuccessStep(form, { result1, result2 });
  });

  test("Should be able to apply for an apartment", async () => {
    const result1 = "You choose a 36m apartment with 1 rooms";
    const result2 = "Therefore your monthly fee is 3 125 SEK";

    await fillIntroStep(form);
    await fillStep1(form, { propertyType: "Lägenhet" });
    await fillStep2(form, { squareMeters: 36, rooms: 1, monthlyFee: 3_125 });
    await fillStep3(form, { ...mainApplicant, hasCoApplicant: "Nej" });
    await fillStep5(form, mainEmployment);
    await checkSuccessStep(form, { result1, result2 });
  });

  test("Should be able to apply for a terraced house (as rental)", async () => {
    const result1 = "You choose a 36m terraced_house with 1 rooms";
    const result2 = "Therefore your monthly fee is 3 125 SEK";

    await fillIntroStep(form);
    await fillStep1(form, { propertyType: "Radhus" });
    await fillStep2(form, { tenancyType: "Bostadsrätt", squareMeters: 36, rooms: 1, monthlyFee: 3_125 });
    await fillStep3(form, { ...mainApplicant, hasCoApplicant: "Nej" });
    await fillStep5(form, mainEmployment);
    await checkSuccessStep(form, { result1, result2 });
  });

  test("Should be able to apply for a terraced house (as ownership)", async () => {
    const result1 = "You choose a 100m terraced_house with 4 rooms";
    const result2 = "Therefore your operating cost is 10 000 SEK";

    await fillIntroStep(form);
    await fillStep1(form, { propertyType: "Radhus" });
    await fillStep2(form, { squareMeters: 100, rooms: 4, operatingCost: 10_000 });
    await fillStep3(form, { ...mainApplicant, hasCoApplicant: "Nej" });
    await fillStep5(form, mainEmployment);
    await checkSuccessStep(form, { result1, result2 });
  });

  test("Should be able to apply for a holiday home (same options as house)", async () => {
    const result1 = "You choose a 100m holiday_home with 4 rooms";
    const result2 = "Therefore your operating cost is 10 000 SEK";

    await fillIntroStep(form);
    await fillStep1(form, { propertyType: "Fritidshus" });
    await fillStep2(form, { squareMeters: 100, rooms: 4, operatingCost: 10_000 });
    await fillStep3(form, { ...mainApplicant, hasCoApplicant: "Nej" });
    await fillStep5(form, mainEmployment);
    await checkSuccessStep(form, { result1, result2 });
  });
});
