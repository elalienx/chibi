// Node modules
import { describe, expect, test } from "vitest";

// Project files
import formatTelephone from "./formatTelephone";

describe("Error cases", () => {
  test("should return an empty string when input is undefined", () => {
    // Arrange
    const input = undefined;
    const result = "";

    // Act
    const test = formatTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should return an empty string when input is null", () => {
    // Arrange
    const input = null;
    const result = "";

    // Act
    const test = formatTelephone(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Normal cases", () => {
  test("should format a full number using the Swedish mobile format", () => {
    // Arrange
    const input = "+46729479111";
    const result = "72 947 91 11";

    // Act
    const test = formatTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should format a partial number while typing", () => {
    // Arrange
    const input = "+467294";
    const result = "72 94";

    // Act
    const test = formatTelephone(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Edge cases", () => {
  test("should format a number without the +46 country code", () => {
    // Arrange
    const input = "729479111";
    const result = "72 947 91 11";

    // Act
    const test = formatTelephone(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should not add a trailing space after a complete group", () => {
    // Arrange
    const input = "+4672";
    const result = "72";

    // Act
    const test = formatTelephone(input);

    // Assert
    expect(test).toBe(result);
  });
});
