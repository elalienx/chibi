// Node modules
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-radio-group/FormPage";

const errorLikesBeer = "#aria-error-likes_beer";
const errorLikesGuiness = "#aria-error-likes_guiness";
const idLikesBeer = "#likes_beer";
const idLikesGuiness = "#likes_guiness";
const submit = "Submit";
const textCleanup = "Text to clean Playwright selector";
const textYes = "Yes";
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
  await expect(form.locator(errorLikesBeer)).toBeVisible();
  await expect(form.locator(errorLikesGuiness)).toBeVisible();
});

test("2. Should submit form without errors", async () => {
  // Arrange
  await form.locator(idLikesBeer).getByText(textYes).click();
  await form.locator(idLikesGuiness).getByText(textYes).click();

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.locator(errorLikesBeer)).not.toBeVisible();
  await expect(form.locator(errorLikesGuiness)).not.toBeVisible();
});

test("3. Clicking on a radio button with error should immediately remove the error", async () => {
  await test.step("Trigger error", async () => {
    // Arrange
    await form.locator(idLikesBeer).getByText(textYes).click();

    // Act
    await form.getByRole("button", { name: submit }).click();

    // Assert
    await expect(form.locator(errorLikesBeer)).not.toBeVisible();
    await expect(form.locator(errorLikesGuiness)).toBeVisible();
  });

  await test.step("Clear error", async () => {
    // Act
    await form.locator(idLikesGuiness).getByText(textYes).click();

    // Assert
    await expect(form.locator(errorLikesBeer)).not.toBeVisible();
    await expect(form.locator(errorLikesGuiness)).not.toBeVisible();
  });
});
