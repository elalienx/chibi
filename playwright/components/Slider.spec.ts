// Node modules
import { test, expect, type Locator } from "@playwright/test";

// Selectors
const submit = "Submit";
const item1 = "Loan amount";
const textSuccess = "640000 kr over 5 years";
const textCleanup = "Text to clean Playwright selector";
let form: Locator;
let periodSlider: Locator;
let amountInput: Locator;
let amountSlider: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-slider/FormPage/Default");
  periodSlider = form.getByRole("slider").nth(0);
  amountInput = form.getByRole("textbox", { name: item1 });
  amountSlider = form.getByRole("slider").nth(1); // Shares the id with the input, so the label only names the textbox
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
  await expect(periodSlider).toHaveValue("5");
});

test("2. Should update the input when moving the connected slider", async () => {
  // Arrange
  await amountSlider.focus();

  // Act
  await amountSlider.press("ArrowRight");

  // Assert
  await expect(amountSlider).toHaveValue("650000");
  await expect(amountInput).toHaveValue("650 000");
  await expect(periodSlider).toHaveValue("5");
});

test("3. Should not affect the loan amount when moving the independent slider", async () => {
  // Arrange
  await periodSlider.focus();

  // Act
  await periodSlider.press("ArrowRight");

  // Assert
  await expect(periodSlider).toHaveValue("6");
  await expect(amountInput).toHaveValue("640 000");
  await expect(amountSlider).toHaveValue("640000");
});

test("4. Should be able to submit the form with the default values", async () => {
  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByText(textSuccess)).toBeVisible();
});
