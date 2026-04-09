// Node modules
import { expect, test } from "@playwright/experimental-ct-react";

// Project files
import FormManager from "forms/road-to-mvp/FormManager";

test("Should be abble to apply for a house", async ({ mount }) => {
  // Properties
  const component = await mount(<FormManager />);
  await test.step("Introduction", async () => {
    await component.getByRole("heading", { name: "Road to MPV" }).waitFor();
    await component.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 1: About the loan", async () => {
    await component.getByRole("heading", { name: "Om lånet" }).waitFor();
    await component.locator("#property_type").getByText("Villa").click();
    await component.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Step 2: About the property", async () => {
    await component.getByRole("heading", { name: "Om bostaden" }).waitFor();
    await component.getByRole("textbox", { name: "Kvadratmeter" }).fill("100");
    await component.getByRole("textbox", { name: "Antal rum" }).fill("4");
    await component.getByRole("textbox", { name: "Driftskostnad" }).fill("10000");
    await component.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Acceptance", async () => {
    await component.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(component.getByText("You choose a 100m house with 4 rooms")).toBeVisible();
    await expect(component.getByText("Therefore your operating cost is 10000 SEK")).toBeVisible();
  });
});

test("Should be abble to apply for an apartment", async ({ mount }) => {
  // Properties
  const component = await mount(<FormManager />);
  await test.step("Introduction", async () => {
    await component.getByRole("heading", { name: "Road to MPV" }).waitFor();
    await component.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 1: About the loan", async () => {
    await component.getByRole("heading", { name: "Om lånet" }).waitFor();
    await component.locator("#property_type").getByText("Lägenhet").click();
    await component.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Step 2: About the property", async () => {
    await component.getByRole("heading", { name: "Om bostaden" }).waitFor();
    await component.getByRole("textbox", { name: "Kvadratmeter" }).fill("36");
    await component.getByRole("textbox", { name: "Antal rum" }).fill("1");
    await component.getByRole("textbox", { name: "Månadsavgift" }).fill("3125");
    await component.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Acceptance", async () => {
    await component.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(component.getByText("You choose a 36m apartment with 1 rooms")).toBeVisible();
    await expect(component.getByText("Therefore your monthly fee is 3125 SEK")).toBeVisible();
  });
});
