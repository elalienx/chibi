// Node modules
import { expect, test } from "@playwright/experimental-ct-react";

// Project files
import FormManager from "forms/road-to-mvp/FormManager";

test("Should be abble to apply for a house", async ({ mount }) => {
  // Properties
  const form = await mount(<FormManager />);

  await test.step("Introduction", async () => {
    await form.getByRole("heading", { name: "Road to MPV" }).waitFor();
    await form.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 1: About the loan", async () => {
    await form.getByRole("heading", { name: "Om lånet" }).waitFor();
    await form.locator("#property_type").getByText("Villa").click();
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Step 2: About the property", async () => {
    await form.getByRole("heading", { name: "Om bostaden" }).waitFor();
    await form.getByRole("textbox", { name: "Kvadratmeter" }).fill("100");
    await form.getByRole("textbox", { name: "Antal rum" }).fill("4");
    await form.getByRole("textbox", { name: "Driftskostnad" }).fill("10000");
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 100m house with 4 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your operating cost is 10000 SEK")).toBeVisible();
  });
});

test("Should be abble to apply for an apartment", async ({ mount }) => {
  // Properties
  const form = await mount(<FormManager />);

  await test.step("Introduction", async () => {
    await form.getByRole("heading", { name: "Road to MPV" }).waitFor();
    await form.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 1: About the loan", async () => {
    await form.getByRole("heading", { name: "Om lånet" }).waitFor();
    await form.locator("#property_type").getByText("Lägenhet").click();
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Step 2: About the property", async () => {
    await form.getByRole("heading", { name: "Om bostaden" }).waitFor();
    await form.getByRole("textbox", { name: "Kvadratmeter" }).fill("36");
    await form.getByRole("textbox", { name: "Antal rum" }).fill("1");
    await form.getByRole("textbox", { name: "Månadsavgift" }).fill("3125");
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 36m apartment with 1 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your monthly fee is 3125 SEK")).toBeVisible();
  });
});

test("Should be abble to apply for a terraced house (as rental)", async ({ mount }) => {
  // Properties
  const form = await mount(<FormManager />);

  await test.step("Introduction", async () => {
    await form.getByRole("heading", { name: "Road to MPV" }).waitFor();
    await form.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 1: About the loan", async () => {
    await form.getByRole("heading", { name: "Om lånet" }).waitFor();
    await form.locator("#property_type").getByText("Radhus").click();
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Step 2: About the property", async () => {
    await form.getByRole("heading", { name: "Om bostaden" }).waitFor();
    await form.locator("#tenancy_type").getByText("Bostadsrätt").click();
    await form.getByRole("textbox", { name: "Kvadratmeter" }).fill("36");
    await form.getByRole("textbox", { name: "Antal rum" }).fill("1");
    await form.getByRole("textbox", { name: "Månadsavgift" }).fill("3125");
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 36m terraced_house with 1 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your monthly fee is 3125 SEK")).toBeVisible();
  });
});

test("Should be abble to apply for a terraced house (as ownership)", async ({ mount }) => {
  // Properties
  const form = await mount(<FormManager />);

  await test.step("Introduction", async () => {
    await form.getByRole("heading", { name: "Road to MPV" }).waitFor();
    await form.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 1: About the loan", async () => {
    await form.getByRole("heading", { name: "Om lånet" }).waitFor();
    await form.locator("#property_type").getByText("Radhus").click();
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Step 2: About the property", async () => {
    await form.getByRole("heading", { name: "Om bostaden" }).waitFor();
    await form.getByRole("textbox", { name: "Kvadratmeter" }).fill("100");
    await form.getByRole("textbox", { name: "Antal rum" }).fill("4");
    await form.getByRole("textbox", { name: "Driftskostnad" }).fill("10000");
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 100m terraced_house with 4 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your operating cost is 10000 SEK")).toBeVisible();
  });
});

test("Should be abble to apply for a holiday home (same options as house)", async ({ mount }) => {
  // Properties
  const form = await mount(<FormManager />);

  await test.step("Introduction", async () => {
    await form.getByRole("heading", { name: "Road to MPV" }).waitFor();
    await form.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 1: About the loan", async () => {
    await form.getByRole("heading", { name: "Om lånet" }).waitFor();
    await form.locator("#property_type").getByText("Fritidshus").click();
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Step 2: About the property", async () => {
    await form.getByRole("heading", { name: "Om bostaden" }).waitFor();
    await form.getByRole("textbox", { name: "Kvadratmeter" }).fill("100");
    await form.getByRole("textbox", { name: "Antal rum" }).fill("4");
    await form.getByRole("textbox", { name: "Driftskostnad" }).fill("10000");
    await form.getByRole("button", { name: "Nästa" }).click();
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You choose a 100m holiday_home with 4 rooms")).toBeVisible();
    await expect(form.getByText("Therefore your operating cost is 10000 SEK")).toBeVisible();
  });
});
