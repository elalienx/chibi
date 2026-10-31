// Node modules
import { expect, test } from "vitest";

// Project files
import employmentTypes from "../../data/employmentTypes";
import getEmploymentFields from "./getEmploymentFields";

// Properties
const permanent = {
  hasEmployer: true,
  hasEndDate: false,
  hasPension: false,
  hasProfession: true,
  hasIncome: true,
};
const selfEmployment = {
  hasEmployer: true,
  hasEndDate: false,
  hasPension: false,
  hasProfession: false,
  hasIncome: true,
};
const temporary = {
  hasEmployer: true,
  hasEndDate: true,
  hasPension: false,
  hasProfession: true,
  hasIncome: true,
};
const retirement = {
  hasEmployer: false,
  hasEndDate: false,
  hasPension: true,
  hasProfession: false,
  hasIncome: false,
};
const student = {
  hasEmployer: false,
  hasEndDate: false,
  hasPension: false,
  hasProfession: false,
  hasIncome: true,
};

const cases = [
  { employmentType: "permanent_employment", expected: permanent },
  { employmentType: "self_employment", expected: selfEmployment },
  { employmentType: "temporary_employment", expected: temporary },
  { employmentType: "substitute_employment", expected: temporary },
  { employmentType: "probationary_employment", expected: permanent },
  { employmentType: "hourly_employment", expected: permanent },
  { employmentType: "retirement", expected: retirement },
  { employmentType: "early_retirement", expected: retirement },
  { employmentType: "disability_retirement", expected: retirement },
  { employmentType: "student", expected: student },
  { employmentType: "no_employment", expected: student },
];

test.each(cases)("should return the right fields for $employmentType", ({ employmentType, expected }) => {
  // Act
  const result = getEmploymentFields(employmentType);

  // Assert
  expect(result).toEqual(expected);
});

test("should show either income or pension for every employment type", () => {
  // Arrange
  const values = employmentTypes.map(({ value }) => value);

  // Act
  const results = values.map((value) => getEmploymentFields(value));

  // Assert
  results.forEach(({ hasIncome, hasPension }) => expect(hasIncome).not.toBe(hasPension));
});

test("should only show the end date and profession when there is an employer", () => {
  // Arrange
  const values = employmentTypes.map(({ value }) => value);

  // Act
  const results = values.map((value) => getEmploymentFields(value));

  // Assert
  results
    .filter(({ hasEmployer }) => !hasEmployer)
    .forEach(({ hasEndDate, hasProfession }) => expect(hasEndDate || hasProfession).toBe(false));
});

test("should fall back to only the income field when the employment type is unknown", () => {
  // Arrange
  const employmentType = ""; // Default value before the user answers Step 3

  // Act
  const result = getEmploymentFields(employmentType);

  // Assert
  expect(result).toEqual(student);
});
