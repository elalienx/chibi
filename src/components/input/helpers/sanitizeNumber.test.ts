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
    const test = sanitizeNumber({ value: input });

    // Assert
    expect(test).toBe(result);
  });

  test("should return an empty string when input has no digits", () => {
    // Arrange
    const input = "abc";
    const result = "";

    // Act
    const test = sanitizeNumber({ value: input });

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
    const test = sanitizeNumber({ value: input });

    // Assert
    expect(test).toBe(result);
  });

  test("should strip spaces from a 7-digit formatted number", () => {
    // Arrange
    const input = "1 234 567";
    const result = "1234567";

    // Act
    const test = sanitizeNumber({ value: input });

    // Assert
    expect(test).toBe(result);
  });

  test("should leave a plain digit string unchanged", () => {
    // Arrange
    const input = "42";
    const result = "42";

    // Act
    const test = sanitizeNumber({ value: input });

    // Assert
    expect(test).toBe(result);
  });
});

describe("Decimal cases", () => {
  test("should strip decimal points when decimals are disabled", () => {
    // Arrange
    const input = "12.34";
    const result = "1234";

    // Act
    const test = sanitizeNumber({ value: input });

    // Assert
    expect(test).toBe(result);
  });

  test("should keep a decimal point when decimals are enabled", () => {
    // Arrange
    const input = "12.34";
    const result = "12.34";

    // Act
    const test = sanitizeNumber({ value: input, allowDecimals: true });

    // Assert
    expect(test).toBe(result);
  });

  test("should keep only the first decimal point", () => {
    // Arrange
    const input = "1.2.3";
    const result = "1.23";

    // Act
    const test = sanitizeNumber({ value: input, allowDecimals: true });

    // Assert
    expect(test).toBe(result);
  });

  test("should strip non-numeric characters except the decimal point", () => {
    // Arrange
    const input = "1e2.3";
    const result = "12.3";

    // Act
    const test = sanitizeNumber({ value: input, allowDecimals: true });

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
    const test = sanitizeNumber({ value: input });

    // Assert
    expect(test).toBe(result);
  });

  test("should strip the - character", () => {
    // Arrange
    const input = "-42";
    const result = "42";

    // Act
    const test = sanitizeNumber({ value: input });

    // Assert
    expect(test).toBe(result);
  });

  test("should strip the e character from exponent notation", () => {
    // Arrange
    const input = "1e2";
    const result = "12";

    // Act
    const test = sanitizeNumber({ value: input });

    // Assert
    expect(test).toBe(result);
  });
});
