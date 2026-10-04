// Node modules
import { describe, expect, test } from "vitest";

// Project files
import limitNumberRange from "./limitNumberRange";

describe("Normal cases", () => {
  test("should return a value unchanged when it is within the range", () => {
    // Arrange
    const input = { value: "5", min: 1, max: 10 };
    const result = "5";

    // Act
    const test = limitNumberRange(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should limit a value below min", () => {
    // Arrange
    const input = { value: "2", min: 5 };
    const result = "5";

    // Act
    const test = limitNumberRange(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should limit a value above max", () => {
    // Arrange
    const input = { value: "12", max: 10 };
    const result = "10";

    // Act
    const test = limitNumberRange(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should skip the min check when min is undefined", () => {
    // Arrange
    const input = { value: "2", max: 10 };
    const result = "2";

    // Act
    const test = limitNumberRange(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should skip the max check when max is undefined", () => {
    // Arrange
    const input = { value: "12", min: 1 };
    const result = "12";

    // Act
    const test = limitNumberRange(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should return the clamped value as a string", () => {
    // Arrange
    const input = { value: "1.2", min: 2, max: 10 };
    const result = "2";

    // Act
    const test = limitNumberRange(input);

    // Assert
    expect(test).toBe(result);
  });
});

describe("Edge cases", () => {
  test("should return an empty value unchanged", () => {
    // Arrange
    const input = { value: "" };
    const result = "";

    // Act
    const test = limitNumberRange(input);

    // Assert
    expect(test).toBe(result);
  });

  test("should return a dot unchanged while it is an incomplete decimal", () => {
    // Arrange
    const input = { value: ".", min: 1, max: 10 };
    const result = ".";

    // Act
    const test = limitNumberRange(input);

    // Assert
    expect(test).toBe(result);
  });
});
