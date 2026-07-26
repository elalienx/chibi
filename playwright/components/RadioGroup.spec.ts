// Node modules
import { test, expect, type Locator } from "@playwright/test";

const error1 = "#aria-error-likes_beer";
const error2 = "#aria-error-likes_guiness";
const item1 = "#likes_beer";
const item2 = "#likes_guiness";
const submit = "Submit";
const textCleanup = "Text to clean Playwright selector";
const textYes = "Yes";
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-radio-group/FormPage/Default");
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
  await expect(form.locator(error1)).toBeVisible();
  await expect(form.locator(error2)).toBeVisible();
});

test("2. Should submit form without errors", async () => {
  // Arrange
  await form.locator(item1).getByText(textYes).click();
  await form.locator(item2).getByText(textYes).click();

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.locator(error1)).not.toBeVisible();
  await expect(form.locator(error2)).not.toBeVisible();
});

test("3. Clicking on a radio button with error should immediately remove the error", async () => {
  await test.step("Trigger error", async () => {
    // Arrange
    await form.locator(item1).getByText(textYes).click();

    // Act
    await form.getByRole("button", { name: submit }).click();

    // Assert
    await expect(form.locator(error1)).not.toBeVisible();
    await expect(form.locator(error2)).toBeVisible();
  });

  await test.step("Clear error", async () => {
    // Act
    await form.locator(item2).getByText(textYes).click();

    // Assert
    await expect(form.locator(error1)).not.toBeVisible();
    await expect(form.locator(error2)).not.toBeVisible();
  });
});
