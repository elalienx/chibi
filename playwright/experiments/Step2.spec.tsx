// Node moduels
import { test, expect } from "@playwright/experimental-ct-react";

// Project files
import Step2 from "forms/mvp-mortgage/-step-2/Step2";

/**
 * About:
 * This file exist to compare the Step 2 on Aphrodite Master vs Aphrodite Chibi.
 * It renders the Step 2 directly with the house properly pre-selected and ends
 * as soon as the submit button stores the user data.
 */
test("should submit form data for house", async ({ mount }) => {
  // Arrange
  const form = await mount(<Step2 propertyType="house" setStep={() => {}} />);

  // Act
  await form.getByRole("textbox", { name: "Kvadratmeter" }).fill(String(120));
  await form.getByRole("textbox", { name: "Antal rum" }).fill(String(5));
  await form.getByRole("textbox", { name: "Driftskostnad" }).fill(String(3_000));
  await form.getByRole("button", { name: "Nästa" }).click();

  // Assert
  await expect(form.getByRole("textbox", { name: "Kvadratmeter" })).toHaveValue("120");
  await expect(form.getByRole("textbox", { name: "Antal rum" })).toHaveValue("5");
  await expect(form.getByRole("textbox", { name: "Driftskostnad" })).toHaveValue("3 000"); // with extra space on purpse due to number formatting
});
