// Node modules
// @ts-ignore
import type { Locator } from "@playwright/test";
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-radio-group/FormPage";

let component: MountResult;
let cleanUpText: Locator;
let error1: Locator;
let error2: Locator;
let option1A: Locator;
let option2A: Locator;
let submitButton: Locator;

test.beforeEach(async ({ mount }) => {
  component = await mount(<FormPage />);
  cleanUpText = component.getByText("Text to clean Playwright selector");
  submitButton = component.getByRole("button", { name: "Submit" });

  // Radio 1
  option1A = component.locator("#likes_beer").getByText("Yes");
  error1 = component.locator("#aria-error-likes_beer");

  // Radio 2
  option2A = component.locator("#likes_guiness").getByText("Yes");
  error2 = component.locator("#aria-error-likes_guiness");
});

test.afterEach(async () => {
  await expect(cleanUpText).toBeVisible();

  // Only run visual regression locally
  if (!process.env.CI) await expect(component).toHaveScreenshot();
});

test("1. Should show error state when submitting empty form", async () => {
  // Act
  await submitButton.click();

  // Assert
  await expect(error1).toBeVisible();
  await expect(error2).toBeVisible();
});

test("2. Should submit form without errors", async () => {
  // Arrange
  await option1A.click();
  await option2A.click();

  // Act
  await submitButton.click();

  // Assert
  await expect(error1).not.toBeVisible();
  await expect(error2).not.toBeVisible();
});

test("3. Clicking on a radio button with error should immediately remove the error", async () => {
  await test.step("Trigger error", async () => {
    // Arrange
    await option1A.click();

    // Act
    await submitButton.click();

    // Assert
    await expect(error1).not.toBeVisible();
    await expect(error2).toBeVisible();
  });

  await test.step("Clear error", async () => {
    // Act
    await option2A.click();

    // Assert
    await expect(error1).not.toBeVisible();
    await expect(error2).not.toBeVisible();
  });
});
