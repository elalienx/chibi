// Node modules
import { expect, test } from "vitest";

// Project files
import months from "../../../data/months";
import getStartMonths from "./getStartMonths";

// Properties
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // getMonth() starts at 0

test("should hide future months when the start year is the current year", () => {
  // Arrange
  const startYear = currentYear;

  // Act
  const result = getStartMonths(startYear);

  // Assert
  expect(result.length).toBe(currentMonth);
});

test("should show all months when the start year is a past year", () => {
  // Arrange
  const startYear = currentYear - 1;

  // Act
  const result = getStartMonths(startYear);

  // Assert
  expect(result).toEqual(months);
});

test("should show all months when no start year is selected", () => {
  // Arrange
  const startYear = 0; // Passed as 0 when the employer fields are hidden

  // Act
  const result = getStartMonths(startYear);

  // Assert
  expect(result).toEqual(months);
});
