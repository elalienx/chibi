// Node modules
import { expect, test } from "@playwright/experimental-ct-react";

// Project files
import FormManager from "forms/mvp-business/FormManager";

test("Should be able to submit with no debt", async ({ mount }) => {
  // Properties
  const form = await mount(<FormManager />);

  await test.step("Step 1", async () => {
    await form.getByRole("heading", { name: "Business MVP" }).waitFor();
    await form.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 4: About the company", async () => {
    await form.getByRole("heading", { name: "Lånesyfte & Omsättning" }).waitFor();
    await form.getByRole("button", { name: "Ditt lånesyfte" }).click();
    await form.getByText("Renovering av lokal").click();
    await form.getByRole("textbox", { name: "Bolagets omsättning från juni" }).fill(String(1_000_000));
    await form.locator("#has_existing_loans").getByText("Nej").click();
    await form.getByRole("button", { name: "Fortsätt" }).click();
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You turnover is 1 000 000 kr and your existing debt is 0 kr.")).toBeVisible();
  });
});

test("Should be able to submit with debt", async ({ mount }) => {
  // Properties
  const form = await mount(<FormManager />);

  await test.step("Step 1", async () => {
    await form.getByRole("heading", { name: "Business MVP" }).waitFor();
    await form.getByRole("button", { name: "Next" }).click();
  });

  await test.step("Step 4: About the company", async () => {
    await form.getByRole("heading", { name: "Lånesyfte & Omsättning" }).waitFor();
    await form.getByRole("button", { name: "Ditt lånesyfte" }).click();
    await form.getByText("Renovering av lokal").click();
    await form.getByRole("textbox", { name: "Bolagets omsättning från juni" }).fill(String(500_000));
    await form.locator("#has_existing_loans").getByText("Ja").click();
    await form.getByRole("textbox", { name: "Uppskattad total skuld på" }).fill(String(250_000));
    await form.getByRole("button", { name: "Fortsätt" }).click();
  });

  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();

    await expect(form.getByText("You turnover is 500 000 kr and your existing debt is 250 000 kr.")).toBeVisible();
  });
});
