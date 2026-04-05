// Node modules
// @ts-ignore
import type { Locator } from "@playwright/test";
import { test, expect } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-2/FormPage";

let cleanUpText: Locator;
let radio1_error: Locator;
let radio1_optionA: Locator;
let radio2_error: Locator;
let radio2_optionA: Locator;
let submitButton: Locator;

test.beforeEach(async ({ mount }) => {
  const component = await mount(<FormPage />);

  radio1_optionA = component.locator("#likes_beer").getByText("Yes");
  radio2_optionA = component.locator("#likes_guiness").getByText("Yes");
  radio1_error = component.locator("#aria-error-likes_beer");
  radio2_error = component.locator("#aria-error-likes_guiness");
  cleanUpText = component.getByText("Text to clean Playwright selector");
  submitButton = component.getByRole("button", { name: "Submit" });
});

test.afterEach(async () => {
  await expect(cleanUpText).toBeVisible();
});

test("1. Should show error state when submitting empty form", async () => {
  // Act
  await submitButton.click();

  // Assert
  await expect(radio1_error).toBeVisible();
  await expect(radio2_error).toBeVisible();
});

test("2. Should submit form without errors", async () => {
  // Act
  await radio1_optionA.click();
  await radio2_optionA.click();
  await radio2_optionA.click(); // again until we fix the re-render bug
  await submitButton.click();

  // Assert
  await expect(radio1_error).not.toBeVisible();
  await expect(radio2_error).not.toBeVisible();
});

test("3. Clicking on a radio button with error should immediately remove the error", async () => {
  await test.step("Trigger error", async () => {
    // Act
    await radio1_optionA.click();
    await submitButton.click();

    // Assert
    await expect(radio1_error).not.toBeVisible();
    await expect(radio2_error).toBeVisible();
  });

  await test.step("Clear error", async () => {
    // Act
    await radio2_optionA.click();

    // Assert
    await expect(radio1_error).not.toBeVisible();
    await expect(radio2_error).not.toBeVisible();
  });
});
