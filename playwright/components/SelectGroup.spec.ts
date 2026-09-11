// Node modules
import { test, expect, type Locator } from "@playwright/test";

const item1 = {
  label: "What is your favorite game developer company?",
  option: "Capcom",
  error: "Choose one game developer company.",
  output: "Select 1 internal value: capcom",
} as const;
const item2 = {
  label: "What was the best accessory in history?",
  optionA: "Arcade stick",
  optionB: "Zapper",
  error: "Choose one accessory.",
  outputA: "Select 2 internal value: 0",
  outputB: "Select 2 internal value: 5",
} as const;
const submit = "Submit";
const textCleanup = "Text to clean Playwright selector";
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-select-group/FormPage/Default");
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  // Only run visual regression locally
  if (!process.env.CI) await expect(form).toHaveScreenshot();
});

test("1. Should show error state when submitting empty form", async () => {
  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(item1.error)).toBeVisible();
  await expect(form.getByText(item2.error)).toBeVisible();
});

test("2. Should not submit when choosing only 1 option", async () => {
  // Arrange
  await test.step("First select", async () => {
    await form.getByRole("textbox", { name: item1.label }).click();
    await form.getByText(item1.option).click();
  });

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(item1.output)).toBeVisible();
  await expect(form.getByText(item1.error)).not.toBeVisible();
  await expect(form.getByText(item2.error)).toBeVisible();
});

test("3. Should be able to submit", async () => {
  // Arrange
  await test.step("First select", async () => {
    await form.getByRole("textbox", { name: item1.label }).click();
    await form.getByText(item1.option).click();
  });
  await test.step("Second select", async () => {
    await form.getByRole("textbox", { name: item2.label }).click();
    await form.getByText(item2.optionA).click();
  });

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(item1.output)).toBeVisible();
  await expect(form.getByText(item2.outputA)).toBeVisible();
  await expect(form.getByText(item1.error)).not.toBeVisible();
  await expect(form.getByText(item2.error)).not.toBeVisible();
});

test("4. Should be able to submit a long list", async () => {
  // Arrange
  await test.step("First select", async () => {
    await form.getByRole("textbox", { name: item1.label }).click();
    await form.getByText(item1.option).click();
  });
  await test.step("Second select", async () => {
    await form.getByRole("textbox", { name: item2.label }).click();
    await form.getByText(item2.optionB).click();
  });

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(item1.output)).toBeVisible();
  await expect(form.getByText(item2.outputB)).toBeVisible();
  await expect(form.getByText(item1.error)).not.toBeVisible();
  await expect(form.getByText(item2.error)).not.toBeVisible();
});
