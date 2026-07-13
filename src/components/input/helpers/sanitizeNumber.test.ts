// Node modules
import { describe, expect, test } from "vitest";

// Project files
import sanitizeNumber from "./sanitizeNumber";

describe("Error cases", () => {
  test("should return an empty string when input is empty", () => {
    // Arrange
    const input = "";
    const result = "";

    // Act
    const test = sanitizeNumber(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should return an empty string when input has no digits", () => {
    // Arrange
    const input = "abc";
    const result = "";

    // Act
    const test = sanitizeNumber(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Normal cases", () => {
  test("should strip spaces added by mistake", () => {
    // Arrange
    const input = " 1234 ";
    const result = "1234";

    // Act
    const test = sanitizeNumber(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should strip spaces from a 7-digit formatted number", () => {
    // Arrange
    const input = "1 234 567";
    const result = "1234567";

    // Act
    const test = sanitizeNumber(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should leave a plain digit string unchanged", () => {
    // Arrange
    const input = "42";
    const result = "42";

    // Act
    const test = sanitizeNumber(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Edge cases", () => {
  test("should strip the + character", () => {
    // Arrange
    const input = "+42";
    const result = "42";

    // Act
    const test = sanitizeNumber(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should strip the - character", () => {
    // Arrange
    const input = "-42";
    const result = "42";

    // Act
    const test = sanitizeNumber(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should strip the e character from exponent notation", () => {
    // Arrange
    const input = "1e2";
    const result = "12";

    // Act
    const test = sanitizeNumber(input);

    // Assert
    expect(test).toBe(result);
  });
});
