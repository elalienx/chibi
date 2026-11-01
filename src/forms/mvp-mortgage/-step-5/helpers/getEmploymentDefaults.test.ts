// Node modules
import { expect, test } from "vitest";

// Project files
import initialApplication from "../../data/initialApplication";
import getEmploymentDefaults from "./getEmploymentDefaults";

test("should keep the employment type selected in Step 3", () => {
  // Arrange
  const employmentType = "permanent_employment";

  // Act
  const result = getEmploymentDefaults(employmentType);

  // Assert
  expect(result.main_employment_type).toBe(employmentType);
});

test("should reset the Step 5 employment fields", () => {
  // Arrange
  const employmentType = "permanent_employment";

  // Act
  const result = getEmploymentDefaults(employmentType);

  // Assert
  expect(result.main_employment_company_name).toBe(initialApplication.main_employment_company_name);
  expect(result.main_employment_monthly_income).toBe(initialApplication.main_employment_monthly_income);
  expect(result.main_employment_to_year).toBe(initialApplication.main_employment_to_year);
});

test("should not touch fields outside Step 5", () => {
  // Arrange
  const employmentType = "permanent_employment";

  // Act
  const result = getEmploymentDefaults(employmentType);

  // Assert
  expect(result).not.toHaveProperty("main_email");
  expect(result).not.toHaveProperty("co_employment_type");
});
