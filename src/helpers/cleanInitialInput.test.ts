// Node modules
import { expect, test } from "vitest";

// Project files
import cleanInitialInput from "./cleanInitialInput";

test("Converts numeric values to strings", () => {
  // Arrange
  const initialInput = {
    name: "Candy",
    quantity: 30,
  };
  const result = {
    name: "Candy",
    quantity: "30",
  };

  // Act
  const test = cleanInitialInput(initialInput);

  // Assert
  expect(test).toStrictEqual(result);
});

test("Keep zero numbers if flag treatZeroAsEmpty is off", () => {
  // Arrange
  const initialInput = {
    item: "Eggs",
    quantity: 0,
  };
  const keepZeroes = false;
  const result = {
    item: "Eggs",
    quantity: "0",
  };

  // Act
  const test = cleanInitialInput(initialInput, keepZeroes);

  // Assert
  expect(test).toStrictEqual(result);
});

test("Remove zero numbers if flag treatZeroAsEmpty is on", () => {
  // Arrange
  const initialInput = {
    item: "Eggs",
    quantity: 0,
  };
  const removeZeroes = true;
  const result = {
    item: "Eggs",
    quantity: "",
  };

  // Act
  const test = cleanInitialInput(initialInput, removeZeroes);

  // Assert
  expect(test).toStrictEqual(result);
});

test("Converts boolean values to strings", () => {
  // Arrange
  const initialInput = {
    has_hear_about_miku: true,
    is_chibi: false,
  };
  const result = {
    has_hear_about_miku: "true",
    is_chibi: "false",
  };

  // Act
  const test = cleanInitialInput(initialInput);

  // Assert
  expect(test).toStrictEqual(result);
});
