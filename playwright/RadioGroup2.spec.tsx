// Node modules
import { test, expect } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "../src/forms/example-2/FormPage";

// Properties
const buttonNext = "Next";
const radio1_error = "#aria-error-likes_beer";
const radio1_optionA = "#likes_beer_true";
const radio2_error = "#aria-error-likes_guiness";
const radio2_optionA = "#likes_guiness_true";

test("1. Should show error state when submitting empty form", async ({ mount }) => {
  // Arrange
  const component = await mount(<FormPage />);

  // Act
  await component.getByRole("button", { name: buttonNext }).click();

  // Assert
  await expect(component.locator(radio1_error)).toBeVisible();
  await expect(component.locator(radio2_error)).toBeVisible();
});

test("2. Should submit form without errors", async ({ mount }) => {
  // Arrange
  const component = await mount(<FormPage />);

  // Act
  await component.locator(radio1_optionA).click();
  await component.locator(radio2_optionA).click();
  await component.locator(radio2_optionA).click(); // again until we fix the re-render bug
  await component.getByRole("button", { name: buttonNext }).click();

  // Assert
  await expect(component.locator(radio1_error)).not.toBeVisible();
  await expect(component.locator(radio2_error)).not.toBeVisible();
});

test("3. Clicking on a radio button with error should immediately remove the error", async ({ mount }) => {
  // Arrange
  const component = await mount(<FormPage />);

  await test.step("Trigger error", async () => {
    // Act
    await component.locator(radio1_optionA).click();
    await component.getByRole("button", { name: buttonNext }).click();

    // Assert
    await expect(component.locator(radio1_error)).not.toBeVisible();
    await expect(component.locator(radio2_error)).toBeVisible();
  });

  await test.step("Clear error", async () => {
    // Act
    await component.locator(radio2_optionA).click();

    // Assert
    await expect(component.locator(radio1_error)).not.toBeVisible();
    await expect(component.locator(radio2_error)).not.toBeVisible();
  });
});
