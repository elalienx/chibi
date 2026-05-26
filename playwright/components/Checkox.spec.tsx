// Node modules
// @ts-ignore
import type { Locator } from "@playwright/test";
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-5/FormPage";

let component: MountResult;
let checkbox1: Locator;
let checkbox2: Locator;
let cleanUpText: Locator;
let onValid: Locator;
let onError: Locator;
let submitButton: Locator;

test.beforeEach(async ({ mount }) => {
  component = await mount(<FormPage />);
  cleanUpText = component.getByText("Text to clean Playwright selector");
  checkbox1 = component.getByRole("checkbox", { name: "Do you accept our terms and conditions?" });
  checkbox2 = component.getByRole("checkbox", { name: "I certify that I am NOT a politically exposed person (PEP)" });
  onValid = component.getByText("The form passed the validation");
  onError = component.getByText("The form failed the validation");
  submitButton = component.getByRole("button", { name: "Submit" });
});

test.afterEach(async () => {
  await expect(cleanUpText).toBeVisible();

  // Only run visual regression locally
  //   if (!process.env.CI) await expect(component).toHaveScreenshot();
});

test("1. Should submit as soon as you press the submit button", async () => {
  // Act
  await submitButton.click();

  // Assert
  await expect(checkbox1).not.toBeChecked();
  await expect(checkbox2).toBeChecked();
  await expect(onValid).toBeVisible();
});

test("2. Should submit if you check the first checkbox", async () => {
  // Arrange
  await checkbox1.check();

  // Act
  await submitButton.click();

  // Assert
  await expect(checkbox1).toBeChecked();
  await expect(checkbox2).toBeChecked();
  await expect(onValid).toBeVisible();
});

test("3. Should fail if you uncheck the second checkbos due to the Political warning", async () => {
  // Arrange
  await checkbox2.uncheck();

  // Act
  await submitButton.click();

  // Assert
  await expect(checkbox1).not.toBeChecked();
  await expect(checkbox2).not.toBeChecked();
  await expect(onError).toBeVisible();
});
