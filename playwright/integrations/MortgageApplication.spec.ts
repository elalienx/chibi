// Node modules
import { expect, test } from "@playwright/test";

// Project files
import fillIntroStep from "./mortgage/fillIntroStep";
import fillStep1 from "./mortgage/fillStep1";
import fillStep2 from "./mortgage/fillStep2";

test("Should be able to apply for a house", async ({ mount, page }) => {
  const form = await mount("forms/mvp-mortgage/FormManager/Default");

  await test.step("Introduction", async () => {
    await fillIntroStep(page);
  });

  await test.step("Step 1: About the loan", async () => {
    await fillStep1(page, { propertyType: "Villa" });
  });

  await test.step("Step 2: About the property", async () => {
    await fillStep2(page, { squareMeters: 100, rooms: 4, operatingCost: 10_000 });
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 100m house with 4 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your operating cost is 10 000 SEK")).toBeVisible();
  });
});

test("Should be able to apply for an apartment", async ({ mount, page }) => {
  const form = await mount("forms/mvp-mortgage/FormManager/Default");

  await test.step("Introduction", async () => {
    await fillIntroStep(page);
  });

  await test.step("Step 1: About the loan", async () => {
    await fillStep1(page, { propertyType: "Lägenhet" });
  });

  await test.step("Step 2: About the property", async () => {
    await fillStep2(page, { squareMeters: 36, rooms: 1, monthlyFee: 3_125 });
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 36m apartment with 1 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your monthly fee is 3 125 SEK")).toBeVisible();
  });
});

test("Should be able to apply for a terraced house (as rental)", async ({ mount, page }) => {
  const form = await mount("forms/mvp-mortgage/FormManager/Default");

  await test.step("Introduction", async () => {
    await fillIntroStep(page);
  });

  await test.step("Step 1: About the loan", async () => {
    await fillStep1(page, { propertyType: "Radhus" });
  });

  await test.step("Step 2: About the property", async () => {
    await fillStep2(page, { tenancyType: "Bostadsrätt", squareMeters: 36, rooms: 1, monthlyFee: 3_125 });
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 36m terraced_house with 1 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your monthly fee is 3 125 SEK")).toBeVisible();
  });
});

test("Should be able to apply for a terraced house (as ownership)", async ({ mount, page }) => {
  const form = await mount("forms/mvp-mortgage/FormManager/Default");

  await test.step("Introduction", async () => {
    await fillIntroStep(page);
  });

  await test.step("Step 1: About the loan", async () => {
    await fillStep1(page, { propertyType: "Radhus" });
  });

  await test.step("Step 2: About the property", async () => {
    await fillStep2(page, { squareMeters: 100, rooms: 4, operatingCost: 10_000 });
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 100m terraced_house with 4 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your operating cost is 10 000 SEK")).toBeVisible();
  });
});

test("Should be able to apply for a holiday home (same options as house)", async ({ mount, page }) => {
  const form = await mount("forms/mvp-mortgage/FormManager/Default");

  await test.step("Introduction", async () => {
    await fillIntroStep(page);
  });

  await test.step("Step 1: About the loan", async () => {
    await fillStep1(page, { propertyType: "Fritidshus" });
  });

  await test.step("Step 2: About the property", async () => {
    await fillStep2(page, { squareMeters: 100, rooms: 4, operatingCost: 10_000 });
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 100m holiday_home with 4 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your operating cost is 10 000 SEK")).toBeVisible();
  });
});
