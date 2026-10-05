// Node modules
import { test, expect, type Locator } from "@playwright/test";

// Selectors
const submit = "Submit";
const item1 = "Loan amount";
const textSuccess = "Success";
const textCleanup = "Text to clean Playwright selector";
let form: Locator;
let amountInput: Locator;
let amountSlider: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-slider/FormPage/Default");
  amountInput = form.getByRole("textbox", { name: item1 });
  amountSlider = form.getByRole("slider"); // Shares the id with the input, so the label only names the textbox
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  // Only run visual regression locally
  if (!process.env.CI) await expect(form).toHaveScreenshot();
});

test("1. Should move the connected slider when typing in the input", async () => {
  // Act
  await amountInput.fill("1000000");
  await amountInput.blur();

  // Assert
  await expect(amountInput).toHaveValue("1 000 000");
  await expect(amountSlider).toHaveValue("1000000");
});

test("2. Should update the input when moving the connected slider", async () => {
  // Arrange
  await amountSlider.focus();

  // Act
  await amountSlider.press("ArrowRight");

  // Assert
  await expect(amountSlider).toHaveValue("1510000");
  await expect(amountInput).toHaveValue("1 510 000");
});

test("3. Should be able to submit the form with the default values", async ({ page }) => {
  // Arrange
  let alertMessage = "";
  page.once("dialog", async (dialog) => {
    alertMessage = dialog.message();
    await dialog.accept();
  });

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect.poll(() => alertMessage).toBe(textSuccess);
});
