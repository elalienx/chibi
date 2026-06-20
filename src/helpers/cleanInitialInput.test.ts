// Node modules
import { expect, test } from "vitest";

// Project files
import cleanInitialInput from "./cleanInitialInput";
import { describe } from "node:test";

describe("Number logic", () => {
  test("Converts numeric values to strings", () => {
    // Arrange
    const initialInput = { name: "Candy", quantity: 30 };
    const result = { name: "Candy", quantity: "30" };

    // Act
    const test = cleanInitialInput({ input: initialInput });

    // Assert
    expect(test).toStrictEqual(result);
  });

  test("Keep zero numbers if flag treatZeroAsEmpty is off", () => {
    // Arrange
    const initialInput = { item: "Eggs", quantity: 0 };
    const result = { item: "Eggs", quantity: "0" };

    // Act
    const test = cleanInitialInput({ input: initialInput, treatZeroAsEmpty: false });

    // Assert
    expect(test).toStrictEqual(result);
  });

  test("Remove zero numbers if flag treatZeroAsEmpty is on", () => {
    // Arrange
    const initialInput = { item: "Eggs", quantity: 0 };
    const result = { item: "Eggs", quantity: "" };

    // Act
    const test = cleanInitialInput({ input: initialInput, treatZeroAsEmpty: true });

    // Assert
    expect(test).toStrictEqual(result);
  });
});

describe("Boolean logic", () => {
  test("Converts boolean values to strings", () => {
    // Arrange
    const initialInput = { has_hear_about_miku: true, is_chibi: false };
    const result = { has_hear_about_miku: "true", is_chibi: "false" };

    // Act
    const test = cleanInitialInput({ input: initialInput });

    // Assert
    expect(test).toStrictEqual(result);
  });
});
