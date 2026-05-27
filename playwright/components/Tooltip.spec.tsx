// Node modules
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-tooltip/FormPage";

const errorInput = "Please enter your full name.";
const errorRadio = "Say either yes or no.";
const label1 = "Full name";
const label2 = "Do you like beer?";
const label3 = "Which brand do you like the most?";
const textCleanup = "Text to clean Playwright selector";
const tooltipText1 = "Click me for more info";
const tooltipText2 = "Write both your first and last name.";
const tooltipText3 = "You can see yes if you like Cider as well.";
const tooltipText4 = "About Guiness!";
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

test("1. Clicking on a tooltip does not trigger a form submission", async () => {
  // Act
  await form.locator("header").getByRole("button").click();

  // Assert
  await expect(form.getByText(tooltipText1)).toBeVisible();
  await expect(form.getByText(errorInput)).not.toBeVisible();
  await expect(form.getByText(errorRadio)).not.toBeVisible();
});

test("2. Clicking outside the tooltip dismiss it", async () => {
  await test.step("Open tooltip", async () => {
    // Act
    await form.locator("header").getByRole("button").click();

    // Assert
    await expect(form.getByText(tooltipText1)).toBeVisible();
  });

  await test.step("Click outside", async () => {
    // Act
    await form.click();

    // Assert
    await expect(form.getByText(tooltipText1)).not.toBeVisible();
  });
});

test("3. Clicking on another tooltip closes the previous one", async () => {
  await test.step("First tooltip", async () => {
    // Act
    await form.locator("header").getByRole("button").click();

    // Assert
    await expect(form.getByText(tooltipText1)).toBeVisible();
  });

  await test.step("Second tooltip", async () => {
    // Act
    await form.getByText(label1).getByRole("button").click();

    // Assert
    await expect(form.getByText(tooltipText1)).not.toBeVisible();
    await expect(form.getByText(tooltipText2)).toBeVisible();
  });

  await test.step("Third tooltip", async () => {
    // Act
    await form.getByText(label2).getByRole("button").click();

    // Assert
    await expect(form.getByText(tooltipText2)).not.toBeVisible();
    await expect(form.getByText(tooltipText3)).toBeVisible();
  });
});

test("4. Can render a tooltip if the parent hints fail but the child label has a backup hint", async () => {
  // Act
  await form.getByText(label3).getByRole("button").click();

  // Assert
  await expect(form.getByText(tooltipText4)).toBeVisible();
});
