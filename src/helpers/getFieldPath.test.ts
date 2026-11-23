// Node modules
import { describe, expect, test } from "vitest";

// Project files
import getFieldPath from "./getFieldPath";

describe("Get field path", () => {
  test("Wraps a top-level field key in a path", () => {
    // Arrange
    const id = "company_name";
    const result = ["company_name"];

    // Act
    const test = getFieldPath(id);

    // Assert
    expect(test).toEqual(result);
  });

  test("Appends the field key to the parent path of a nested form", () => {
    // Arrange
    const id = "employee_name";
    const path = ["employees", 0] as const;
    const result = ["employees", 0, "employee_name"];

    // Act
    const test = getFieldPath(id, path);

    // Assert
    expect(test).toEqual(result);
  });
});
