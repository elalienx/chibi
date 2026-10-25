// Node modules
import { test, expect, type Locator } from "@playwright/test";

// Properties
const error1 = "Choose one game developer company.";
const error2 = "Choose one accessory.";
const item1 = "What is your favorite game developer company?";
const item1Option1 = "Capcom";
const item2 = "What was the best accessory in history?";
const item2Option1 = "Arcade stick";
const item2Option2 = "Zapper";
const output1 = "Select 1 internal value: capcom";
const output2A = "Select 2 internal value: 0";
const output2B = "Select 2 internal value: 5";
const submit = "Submit";
const textCleanup = "Text to clean Playwright selector";
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-select-group/FormPage/Default");
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  await expect(form).toHaveScreenshot();
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
    await form.getByRole("textbox", { name: item1 }).click();
    await form.getByRole("radio", { name: item1Option1 }).check();
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
    await form.getByRole("textbox", { name: item1 }).click();
    await form.getByRole("radio", { name: item1Option1 }).check();
  });
  await test.step("Second select", async () => {
    await form.getByRole("textbox", { name: item2 }).click();
    await form.getByRole("radio", { name: item2Option1 }).check();
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
    await form.getByRole("textbox", { name: item1 }).click();
    await form.getByRole("radio", { name: item1Option1 }).check();
  });
  await test.step("Second select", async () => {
    await form.getByRole("textbox", { name: item2 }).click();
    await form.getByRole("radio", { name: item2Option2 }).check();
  });

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(output1)).toBeVisible();
  await expect(form.getByText(output2B)).toBeVisible();
  await expect(form.getByText(error1)).not.toBeVisible();
  await expect(form.getByText(error2)).not.toBeVisible();
});
