// Node modules
import { describe, expect, test } from "vitest";

// Project files
import getFieldPath from "./getFieldPath";

describe("Get field path", () => {
  test("Uses the id alone for a flat field", () => {
    // Arrange
    const id = "company_name";
    const result = { fieldPath: ["company_name"], domId: "company_name" };

    // Act
    const test = getFieldPath(id);

    // Assert
    expect(test).toEqual(result);
  });

  test("Appends the id to the parent path for a nested field", () => {
    // Arrange
    const id = "employee_name";
    const path = ["employees", 0] as const;
    const result = { fieldPath: ["employees", 0, "employee_name"], domId: "employees.0.employee_name" };

    // Act
    const test = getFieldPath(id, path);

    // Assert
    expect(test).toEqual(result);
  });
});
