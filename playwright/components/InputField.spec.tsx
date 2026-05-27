// Node modules
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-input-field/FormPage";

const validName = "Eduardo";
const invalidName = "Ed"; // Below minimum length
const submit = "Submit";
const textCleanup = "Text to clean Playwright selector";
const item1 = "Full name";
const item2 = "Age";
const errorNameTooShort = "Name is too short";
const parent = ".."; // The parent of the input is the one having the CSS styles
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
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/error/);
  await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/error/);
});

test("2. Should show active state when input is focused and untouched", async () => {
  // Act
  await form.getByRole("textbox", { name: item1 }).focus();

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/focus/);
  await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
});

test("3. Should return to default state when input is focused and then blurred without typing", async () => {
  // Arrange
  await form.getByRole("textbox", { name: item1 }).focus();

  // Act
  await form.getByRole("textbox", { name: item1 }).blur();

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/default/);
  await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
});

test("4. Should remain active while typing invalid value without blurring", async () => {
  // Act
  await form.getByRole("textbox", { name: item1 }).fill(invalidName);

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/focus/);
  await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
});

test("5. Should show error state when invalid value is entered and input is blurred", async () => {
  // Arrange
  await form.getByRole("textbox", { name: item1 }).fill(invalidName);

  // Act
  await form.getByRole("textbox", { name: item1 }).blur();

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/error/);
  await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
});

test("6. Should remain active while typing valid value without blurring", async () => {
  // Act
  await form.getByRole("textbox", { name: item1 }).fill(validName);

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/focus/);
  await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
});

test("7. Should show success state when valid value is entered and input is blurred", async () => {
  // Arrange
  await form.getByRole("textbox", { name: item1 }).fill(validName);

  // Act
  await form.getByRole("textbox", { name: item1 }).blur();

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/success/);
  await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
});

test("8. Should keep error state when focusing a field that already has an error", async () => {
  await test.step("fill invalid data", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item1 }).fill(invalidName);

    // Act
    await form.getByRole("textbox", { name: item1 }).blur();

    // Assert
    await expect(form.getByText(errorNameTooShort)).toBeVisible();
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });

  await test.step("fill valid data", async () => {
    // Act
    await form.getByRole("textbox", { name: item1 }).focus();

    // Assert
    await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/error/);
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });
});

test("9. Should keep error state while correcting invalid field without blurring", async () => {
  await test.step("fill invalid data", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item1 }).fill(invalidName);

    // Act
    await form.getByRole("textbox", { name: item1 }).blur();

    // Assert
    await expect(form.getByText(errorNameTooShort)).toBeVisible();
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });

  await test.step("fill valid data", async () => {
    // Act
    await form.getByRole("textbox", { name: item1 }).fill(validName);

    // Assert
    await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/error/);
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });
});

test("10. Should transition from error to success when valid value is entered and input is blurred", async () => {
  await test.step("fill invalid data", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item1 }).fill(invalidName);

    // Act
    await form.getByRole("textbox", { name: item1 }).blur();

    // Assert
    await expect(form.getByText(errorNameTooShort)).toBeVisible();
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });

  await test.step("fill valid data", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item1 }).fill(validName);

    // Act
    await form.getByRole("textbox", { name: item1 }).blur();

    // Assert
    await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/success/);
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });
});

test("11. Second field should not validate while active after first field has been interacted with", async () => {
  await test.step("first input: fill invalid data", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item1 }).fill(invalidName);

    // Act
    await form.getByRole("textbox", { name: item1 }).blur();

    // Assert
    await expect(form.getByText(errorNameTooShort)).toBeVisible();
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });

  await test.step("first input: fill valid data", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item1 }).fill(validName);

    // Act
    await form.getByRole("textbox", { name: item1 }).blur();

    // Assert
    await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/success/);
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });

  await test.step("second input: fill invalid data", async () => {
    // Act
    await form.getByRole("textbox", { name: item2 }).fill("1"); // just one character is enough to see if it will fail

    // Assert
    await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/success/);
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/focus/);
  });
});

test("12. Should keep error if user clears the input after a validation error", async () => {
  await test.step("fill invalid data", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item1 }).fill(invalidName);

    // Act
    await form.getByRole("textbox", { name: item1 }).blur();

    // Assert
    await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/error/);
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });

  await test.step("clear invalid data", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item1 }).fill("");

    // Act
    await form.getByRole("textbox", { name: item1 }).blur();

    // Assert
    await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/error/);
    await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/default/);
  });
});

test("13. Should be able to submit the form", async () => {
  // Arrange
  await form.getByRole("textbox", { name: item1 }).fill(validName);
  await form.getByRole("textbox", { name: item2 }).fill("18");
  await form.getByRole("textbox", { name: item2 }).blur();

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/success/);
  await expect(form.getByRole("textbox", { name: item2 }).locator(parent)).toHaveClass(/success/);
});
