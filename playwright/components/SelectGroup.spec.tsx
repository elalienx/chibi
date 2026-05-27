// Node modules
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-select-group/FormPage";

const error1 = "Choose one game developer company.";
const error2 = "Choose one accessory.";
const item1 = "Choose a developer";
const item1Option1 = "Capcom";
const item2 = "Choose an accessory";
const item2Option1 = "Arcade stick";
const item2Option2 = "Zapper";
const output1 = "Select 1 internal value: capcom";
const output2A = "Select 2 internal value: 0";
const output2B = "Select 2 internal value: 5";
const submit = "Submit";
const textCleanup = "Text to clean Playwright selector";
let form: MountResult;

test.beforeEach(async ({ mount }) => {
  // Arrange
  form = await mount(<FormPage />);
});

test.afterEach(async () => {
  // Assert
  await expect(form.getByText(textCleanup)).toBeVisible();

  // Only run visual regression locally
  if (!process.env.CI) await expect(form).toHaveScreenshot();
});

test("1. Should show error state when submitting empty form", async () => {
  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(error1)).toBeVisible();
  await expect(form.getByText(error2)).toBeVisible();
});

test("2. Should not submit when choosing only 1 option", async () => {
  // Arrange
  await test.step("First select", async () => {
    await form.getByRole("button", { name: item1 }).click();
    await form.getByText(item1Option1).click();
  });

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(output1)).toBeVisible();
  await expect(form.getByText(error1)).not.toBeVisible();
  await expect(form.getByText(error2)).toBeVisible();
});

test("3. Should be able to submit", async () => {
  // Arrange
  await test.step("First select", async () => {
    await form.getByRole("button", { name: item1 }).click();
    await form.getByText(item1Option1).click();
  });
  await test.step("Second select", async () => {
    await form.getByRole("button", { name: item2 }).click();
    await form.getByText(item2Option1).click();
  });

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(output1)).toBeVisible();
  await expect(form.getByText(output2A)).toBeVisible();
  await expect(form.getByText(error1)).not.toBeVisible();
  await expect(form.getByText(error2)).not.toBeVisible();
});

test("4. Should be able to submit a long list", async () => {
  // Arrange
  await test.step("First select", async () => {
    await form.getByRole("button", { name: item1 }).click();
    await form.getByText(item1Option1).click();
  });
  await test.step("Second select", async () => {
    await form.getByRole("button", { name: item2 }).click();
    await form.getByText(item2Option2).click();
  });

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(output1)).toBeVisible();
  await expect(form.getByText(output2B)).toBeVisible();
  await expect(form.getByText(error1)).not.toBeVisible();
  await expect(form.getByText(error2)).not.toBeVisible();
});
