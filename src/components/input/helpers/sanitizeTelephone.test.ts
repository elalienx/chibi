// Node modules
import { describe, expect, test } from "vitest";

// Project files
import sanitizeTelephone from "./sanitizeTelephone";

describe("Error cases", () => {
  test("should return an empty string when input is empty", () => {
    // Arrange
    const input = "";
    const result = "";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should return an empty string when input has no digits", () => {
    // Arrange
    const input = "abc";
    const result = "";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Normal cases", () => {
  test("should strip the spaces of a formatted number", () => {
    // Arrange
    const input = "72 947 91 11";
    const result = "729479111";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should strip the leading 0 replaced by +46", () => {
    // Arrange
    const input = "072-947 91 11";
    const result = "729479111";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should strip the +46 country code", () => {
    // Arrange
    const input = "+46 72 947 91 11";
    const result = "729479111";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should strip the 0046 international prefix", () => {
    // Arrange
    const input = "0046729479111";
    const result = "729479111";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Edge cases", () => {
  test("should strip the leading 0 written after the +46 country code", () => {
    // Arrange
    const input = "+46 072 947 91 11";
    const result = "729479111";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should keep a partial number starting with 46 while typing", () => {
    // Arrange
    const input = "46";
    const result = "46";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should limit the number to 9 digits", () => {
    // Arrange
    const input = "72 947 91 112";
    const result = "729479111";

    // Act
    const test = sanitizeTelephone(input);

    // Assert
    expect(test).toBe(result);
  });
});
