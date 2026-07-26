// Node modules
import { test, expect, type Locator } from "@playwright/test";

// Selectors
const submit = "Submit";
const item1 = "Do you accept our terms and conditions?";
const item2 = "I certify that I am NOT a politically exposed person (PEP)";
const textSuccess = "The form passed the validation";
const textFailure = "The form failed the validation";
const textCleanup = "Text to clean Playwright selector";
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-checkbox/FormPage/Default");
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  // Only run visual regression locally
  if (!process.env.CI) await expect(form).toHaveScreenshot();
});

test("1. Should submit as soon as you press the submit button", async () => {
  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByRole("checkbox", { name: item1 })).not.toBeChecked();
  await expect(form.getByRole("checkbox", { name: item2 })).toBeChecked();
  await expect(form.getByText(textSuccess)).toBeVisible();
});

test("2. Should submit if you check the first checkbox", async () => {
  // Act
  await form.getByRole("checkbox", { name: item1 }).check();
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByRole("checkbox", { name: item1 })).toBeChecked();
  await expect(form.getByRole("checkbox", { name: item2 })).toBeChecked();
  await expect(form.getByText(textSuccess)).toBeVisible();
});

test("3. Should fail if you uncheck the second checkbox due to the Political warning", async () => {
  // Arrange
  await form.getByRole("checkbox", { name: item2 }).uncheck();

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByRole("checkbox", { name: item1 })).not.toBeChecked();
  await expect(form.getByRole("checkbox", { name: item2 })).not.toBeChecked();
  await expect(form.getByText(textFailure)).toBeVisible();
});
