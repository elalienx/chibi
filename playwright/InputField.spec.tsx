// Node modules
// @ts-ignore
import type { Locator } from "@playwright/test";
import { test, expect } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "../src/forms/example-1/FormPage";

const validName = "Eduardo";
const invalidName = "Ed"; // Below minimum length
let cleanUpText: Locator;
let input1: Locator;
let input2: Locator;
let submitButton: Locator;
let wrapper1: Locator;
let wrapper2: Locator;

test.beforeEach(async ({ mount }) => {
  const component = await mount(<FormPage />);

  cleanUpText = component.getByText("Text to clean Playwright selector");
  input1 = component.getByRole("textbox", { name: "Full name" });
  input2 = component.getByRole("textbox", { name: "E-mail" });
  wrapper1 = input1.locator("..");
  wrapper2 = input2.locator("..");
  submitButton = component.getByRole("button", { name: "Submit" });
});

test.afterEach(async () => {
  await expect(cleanUpText).toBeVisible();
});

test("1. Should show error state when submitting empty form", async () => {
  // Act
  await submitButton.click();

  // Assert
  await expect(wrapper1).toHaveClass(/error/);
  await expect(wrapper2).toHaveClass(/error/);
});

test("2. Should show active state when input is focused and untouched", async () => {
  // Act
  await input1.focus();

  // Assert
  await expect(wrapper1).toHaveClass(/focus/);
  await expect(wrapper2).toHaveClass(/default/);
});

test("3. Should return to default state when input is focused and then blurred without typing", async () => {
  // Act
  await input1.focus();
  await input1.blur();

  // Assert
  await expect(wrapper1).toHaveClass(/default/);
  await expect(wrapper2).toHaveClass(/default/);
});

test("4. Should remain active while typing invalid value without blurring", async () => {
  // Act
  await input1.fill(invalidName);

  // Assert
  await expect(wrapper1).toHaveClass(/focus/);
  await expect(wrapper2).toHaveClass(/default/);
});

test("5. Should show error state when invalid value is entered and input is blurred", async () => {
  // Act
  await input1.fill(invalidName);
  await input1.blur();

  // Assert
  await expect(wrapper1).toHaveClass(/error/);
  await expect(wrapper2).toHaveClass(/default/);
});

test("6. Should remain active while typing valid value without blurring", async () => {
  // Act
  await input1.fill(validName);

  // Assert
  await expect(wrapper1).toHaveClass(/focus/);
  await expect(wrapper2).toHaveClass(/default/);
});

test("7. Should show success state when valid value is entered and input is blurred", async () => {
  // Act
  await input1.fill(validName);
  await input1.blur();

  // Assert
  await expect(wrapper1).toHaveClass(/success/);
  await expect(wrapper2).toHaveClass(/default/);
});

test("8. Should keep error state when focusing a field that already has an error", async () => {
  await test.step("fill invalid data", async () => {
    // Act
    await input1.fill(invalidName);
    await input1.blur();

    // Assert
    await expect(wrapper1.getByText("Name is too short")).toBeVisible();
    await expect(wrapper2).toHaveClass(/default/);
  });

  await test.step("fill valid data", async () => {
    // Act
    await input1.focus();

    // Assert
    await expect(wrapper1).toHaveClass(/error/);
    await expect(wrapper2).toHaveClass(/default/);
  });
});

test("9. Should keep error state while correcting invalid field without blurring", async () => {
  await test.step("fill invalid data", async () => {
    // Act
    await input1.fill(invalidName);
    await input1.blur();

    // Assert
    await expect(wrapper1.getByText("Name is too short")).toBeVisible();
    await expect(wrapper2).toHaveClass(/default/);
  });

  await test.step("fill valid data", async () => {
    // Act
    await input1.fill(validName);

    // Assert
    await expect(wrapper1).toHaveClass(/error/);
    await expect(wrapper2).toHaveClass(/default/);
  });
});

test("10. Should transition from error to success when valid value is entered and input is blurred", async () => {
  await test.step("fill invalid data", async () => {
    // Act
    await input1.fill(invalidName);
    await input1.blur();

    // Assert
    await expect(wrapper1.getByText("Name is too short")).toBeVisible();
    await expect(wrapper2).toHaveClass(/default/);
  });

  await test.step("fill valid data", async () => {
    // Act
    await input1.fill(validName);
    await input1.blur();

    // Assert
    await expect(wrapper1).toHaveClass(/success/);
    await expect(wrapper2).toHaveClass(/default/);
  });
});

test("11. Second field should not validate while active after first field has been interacted with", async () => {
  await test.step("first input: fill invalid data", async () => {
    // Act
    await input1.fill(invalidName);
    await input1.blur();

    // Assert
    await expect(wrapper1.getByText("Name is too short")).toBeVisible();
    await expect(wrapper2).toHaveClass(/default/);
  });

  await test.step("first input: fill valid data", async () => {
    // Act
    await input1.fill(validName);
    await input1.blur();

    // Assert
    await expect(wrapper1).toHaveClass(/success/);
    await expect(wrapper2).toHaveClass(/default/);
  });

  await test.step("second input: fill invalid data", async () => {
    // Act
    await input2.fill("e"); // just one character is enough to see if it will fail

    // Assert
    await expect(wrapper1).toHaveClass(/success/);
    await expect(wrapper2).toHaveClass(/focus/);
  });
});

test("12. Should keep error if user clears the input after a validation error", async () => {
  await test.step("fill invalid data", async () => {
    // Act
    await input1.fill(invalidName);
    await input1.blur();

    // Assert
    await expect(wrapper1).toHaveClass(/error/);
    await expect(wrapper2).toHaveClass(/default/);
  });

  await test.step("clear invalid data", async () => {
    // Act
    await input1.fill("");
    await input1.blur();

    // Assert
    await expect(cleanUpText).toBeVisible(); // weird trick to force a validation re-render
    await expect(wrapper1).toHaveClass(/error/);
    await expect(wrapper2).toHaveClass(/default/);
  });
});
