// Node modules
import { describe, expect, test } from "vitest";

// Project files
import formatWithSpaces from "./formatWithSpaces"; // Adjust the path as needed

describe("Error cases", () => {
  test("should return an empty string when input is undefined", () => {
    // Arrange
    const input = undefined;
    const result = "";

    // Act
    const test = formatWithSpaces(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should return an empty string when input is null", () => {
    // Arrange
    const input = null;
    const result = "";

    // Act
    const test = formatWithSpaces(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Normal cases", () => {
  test("should format a 4-digit number with a space", () => {
    // Arrange
    const input = 1234;
    const result = "1 234";

    // Act
    const test = formatWithSpaces(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should format a long number (7 digits) with correct spacing", () => {
    // Arrange
    const input = 1234567;
    const result = "1 234 567";

    // Act
    const test = formatWithSpaces(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should handle zero correctly", () => {
    // Arrange
    const input = 0;
    const result = "0";

    // Act
    const test = formatWithSpaces(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Edge cases", () => {
  test("should strip non-digit characters from a string", () => {
    // Arrange
    const input = "123abc456";
    const result = "123 456";

    // Act
    const test = formatWithSpaces(input);

    // Assert
    expect(test).toBe(result);
  });
});
