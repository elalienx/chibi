// Node modules
// @ts-ignore
import type { Locator } from "@playwright/test";
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-4/FormPage";

let cleanUpText: Locator;
let component: MountResult;
let select1: Locator;
let output1: Locator;
let error1: Locator;
let option1A: Locator;
let select2: Locator;
let output2: Locator;
let error2: Locator;
let option2A: Locator;
let submitButton: Locator;

test.beforeEach(async ({ mount }) => {
  component = await mount(<FormPage />);
  submitButton = component.getByRole("button", { name: "Submit" });
  cleanUpText = component.getByText("Text to clean Playwright selector");

  // Select 1
  select1 = component.locator("#--select-trigger-publisher");
  option1A = component.getByText("Capcom");
  error1 = component.locator("#aria-error-publisher");
  output1 = component.getByText("Select 1: capcom");

  // Select 2
  select2 = component.locator("#--select-trigger-accessory");
  option2A = component.getByText("Arcade stick");
  error2 = component.locator("#aria-error-accessory");
  output2 = component.getByText("Select 2: arcade_stick");
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

test("2. Should not submit when choosing only 1 option", async () => {
  // Act
  await test.step("First select", async () => {
    await select1.click();
    await option1A.click();
  });

  // Assert
  await expect(output1).toBeVisible();
});

test("3. Should be able to submit", async () => {
  // Act
  await test.step("First select", async () => {
    await select1.click();
    await option1A.click();
  });

  await test.step("Second select", async () => {
    await select2.click();
    await option2A.click();
  });

  // Assert
  await expect(output1).toBeVisible();
  await expect(output2).toBeVisible();
});
