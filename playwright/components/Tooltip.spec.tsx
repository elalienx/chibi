// Node modules
// @ts-ignore
import type { Locator } from "@playwright/test";
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-3/FormPage";

const inputValidationError = "Please enter your full name.";
const radioValidationError = "Say either yes or no.";
const tooltipText1 = "Click me for more info";
const tooltipText2 = "Write both your first and last name.";
const tooltipText3 = "You can see yes if you like Cider as well.";
const tooltipText4 = "Guiness is the best option.";

let cleanUpText: Locator;
let component: MountResult;
let radio_option: Locator;
let tooltip1: Locator;
let tooltip2: Locator;
let tooltip3: Locator;
let tooltip4: Locator;

test.beforeEach(async ({ mount }) => {
  component = await mount(<FormPage />);
  radio_option = component.locator("#likes_beer").getByText("Yes");
  tooltip1 = component.locator("header").getByRole("button");
  tooltip2 = component.locator("label").filter({ hasText: "Full name" }).getByRole("button");
  tooltip3 = component.locator("label").filter({ hasText: "Do you like beer?" }).getByRole("button");
  tooltip4 = component.locator("label").filter({ hasText: "Which brand do you like the most?" }).getByRole("button");
  cleanUpText = component.getByText("Text to clean Playwright selector");
});

test.afterEach(async () => {
  await expect(cleanUpText).toBeVisible();

  // Only run visual regression locally
  if (!process.env.CI) await expect(component).toHaveScreenshot();
});

test("1. Clicking on a tooltip does not trigger a form submission", async () => {
  // Act
  await tooltip1.click();

  // Assert
  await expect(component.getByText(tooltipText1)).toBeVisible();
  await expect(component.getByText(inputValidationError)).not.toBeVisible();
  await expect(component.getByText(radioValidationError)).not.toBeVisible();
});

test("2. Clicking outside the tooltip dismiss it", async () => {
  await test.step("Open tooltip", async () => {
    // Act
    await tooltip1.click();

    // Assert
    await expect(component.getByText(tooltipText1)).toBeVisible();
  });

  await test.step("Click outside", async () => {
    // Act
    await radio_option.click();

    // Assert
    await expect(component.getByText(tooltipText1)).not.toBeVisible();
  });
});

test("3. Clicking on another tooltip closes the previous one", async () => {
  await test.step("First tooltip", async () => {
    // Act
    await tooltip1.click();

    // Assert
    await expect(component.getByText(tooltipText1)).toBeVisible();
  });

  await test.step("Second tooltip", async () => {
    // Act
    await tooltip2.click();

    // Assert
    await expect(component.getByText(tooltipText1)).not.toBeVisible();
    await expect(component.getByText(tooltipText2)).toBeVisible();
  });

  await test.step("Third tooltip", async () => {
    // Act
    await tooltip3.click();

    // Assert
    await expect(component.getByText(tooltipText2)).not.toBeVisible();
    await expect(component.getByText(tooltipText3)).toBeVisible();
  });
});

test("4. Can render a tooltip if the parent hints fail but the child label has a backup hint", async () => {
  // Act
  await tooltip4.click();

  // Assert
  await expect(component.getByText(tooltipText4)).toBeVisible();
});
