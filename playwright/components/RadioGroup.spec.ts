// Node modules
import { test, expect, type Locator } from "@playwright/test";

const error = "Say either yes or no.";
const group1 = "Do you like beer?";
const group2 = "Do you like Guiness?";
const submit = "Submit";
const textCleanup = "Text to clean Playwright selector";
const textYes = "Yes";
const textNo = "No";
let form: Locator;
let item1: Locator;
let item2: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-radio-group/FormPage/Default");
  item1 = form.getByRole("radiogroup", { name: group1 });
  item2 = form.getByRole("radiogroup", { name: group2 });
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  await expect(form).toHaveScreenshot();
});

test("1. Should show error state when submitting empty form", async () => {
  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(item1).toHaveAccessibleDescription(error);
  await expect(item2).toHaveAccessibleDescription(error);
});

test("2. Should submit form without errors (boolean is TRUE)", async () => {
  // Arrange
  await item1.getByText(textYes).click();
  await item2.getByText(textYes).click();

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(item1.getByRole("radio", { name: textYes })).toBeChecked();
  await expect(item2.getByRole("radio", { name: textYes })).toBeChecked();
  await expect(item1).toHaveAccessibleDescription("");
  await expect(item2).toHaveAccessibleDescription("");
  await expect(form.getByText("Radio 2: TRUE")).toBeVisible();
});

test("3. Should submit form without errors (boolean is FALSE)", async () => {
  // Arrange
  await item1.getByText(textYes).click();
  await item2.getByText(textNo).click();

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(item1.getByRole("radio", { name: textYes })).toBeChecked();
  await expect(item2.getByRole("radio", { name: textNo })).toBeChecked();
  await expect(item1).toHaveAccessibleDescription("");
  await expect(item2).toHaveAccessibleDescription("");
  await expect(form.getByText("Radio 2: FALSE")).toBeVisible();
});

test("4. Clicking on a radio button with error should immediately remove the error", async () => {
  await test.step("Trigger error", async () => {
    // Arrange
    await item1.getByText(textYes).click();

    // Act
    await form.getByRole("button", { name: submit }).click();

    // Assert
    await expect(item1).toHaveAccessibleDescription("");
    await expect(item2).toHaveAccessibleDescription(error);
  });

  await test.step("Clear error", async () => {
    // Act
    await item2.getByText(textYes).click();

    // Assert
    await expect(item1).toHaveAccessibleDescription("");
    await expect(item2).toHaveAccessibleDescription("");
  });
});
