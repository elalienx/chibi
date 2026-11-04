// Node modules
import { expect, test } from "vitest";

// Project files
import initialApplication from "../../data/initialApplication";
import getEmploymentDefaults from "./getEmploymentDefaults";

test("should keep the employment type selected in Step 4", () => {
  // Arrange
  const employmentType = "permanent_employment";

  // Act
  const result = getEmploymentDefaults(employmentType);

  // Assert
  expect(result.co_employment_type).toBe(employmentType);
});

test("should reset the Step 6 employment fields", () => {
  // Arrange
  const employmentType = "permanent_employment";

  // Act
  const result = getEmploymentDefaults(employmentType);

  // Assert
  expect(result.co_employment_company_name).toBe(initialApplication.co_employment_company_name);
  expect(result.co_employment_monthly_income).toBe(initialApplication.co_employment_monthly_income);
  expect(result.co_employment_to_year).toBe(initialApplication.co_employment_to_year);
});

test("should not touch fields outside Step 6", () => {
  // Arrange
  const employmentType = "permanent_employment";

  // Act
  const result = getEmploymentDefaults(employmentType);

  // Assert
  expect(result).not.toHaveProperty("co_email");
  expect(result).not.toHaveProperty("main_employment_type");
});
