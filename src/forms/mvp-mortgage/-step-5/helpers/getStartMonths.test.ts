// Node modules
import { afterEach, beforeEach, expect, test, vi } from "vitest";

// Project files
import months from "../../data/months";
import getStartMonths from "./getStartMonths";

// Properties
const today = new Date(2026, 4, 15); // 15 May 2026, getMonth() starts at 0

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(today);
});

afterEach(() => {
  vi.useRealTimers();
});

test("should hide future months when the start year is the current year", () => {
  // Arrange
  const startYear = 2026;

  // Act
  const result = getStartMonths(startYear);

  // Assert
  expect(result.map(({ value }) => value)).toEqual([1, 2, 3, 4, 5]);
});

test("should show all months when the start year is a past year", () => {
  // Arrange
  const startYear = 2020;

  // Act
  const result = getStartMonths(startYear);

  // Assert
  expect(result).toEqual(months);
});

test("should show all months when no start year is selected", () => {
  // Arrange
  const startYear = 0; // Step 5 passes 0 when the employer fields are hidden

  // Act
  const result = getStartMonths(startYear);

  // Assert
  expect(result).toEqual(months);
});
