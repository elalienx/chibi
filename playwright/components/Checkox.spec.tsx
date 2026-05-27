// Node modules
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-checkbox/FormPage";

const submit = "Submit";
const item1 = "Do you accept our terms and conditions?";
const item2 = "I certify that I am NOT a politically exposed person (PEP)";
const textSuccess = "The form passed the validation";
const textFailure = "The form failed the validation";
const textCleanup = "Text to clean Playwright selector";
let form: MountResult;

test.afterEach(async () => {
  // Assert 

  // Only run visual regression locally
  if (!process.env.CI) await expect(form).toHaveScreenshot();
});

test("1. Should submit as soon as you press the submit button", async ({ mount }) => {
  // Arrange
  form = await mount(<FormPage />);

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByRole("checkbox", { name: item1 })).not.toBeChecked();
  await expect(form.getByRole("checkbox", { name: item2 })).toBeChecked();
  await expect(form.getByText(textSuccess)).toBeVisible();
});

test("2. Should submit if you check the first checkbox", async ({ mount }) => {
  // Arrange
  form = await mount(<FormPage />);

  // Act
  await form.getByRole("checkbox", { name: item1 }).check();
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByRole("checkbox", { name: item1 })).toBeChecked();
  await expect(form.getByRole("checkbox", { name: item2 })).toBeChecked();
  await expect(form.getByText(textSuccess)).toBeVisible();
});

test("3. Should fail if you uncheck the second checkbos due to the Political warning", async ({ mount }) => {
  // Arrange
  form = await mount(<FormPage />);

  // Act
  await form.getByRole("checkbox", { name: item2 }).uncheck();
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByRole("checkbox", { name: item1 })).not.toBeChecked();
  await expect(form.getByRole("checkbox", { name: item2 })).not.toBeChecked();
  await expect(form.getByText(textFailure)).toBeVisible();
});
