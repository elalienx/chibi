// Node modules
import { describe, expect, test } from "vitest";

// Project files
import pathToId from "./pathToId";

describe("Path to id", () => {
  test("Keeps a top-level field as its key", () => {
    // Arrange
    const path = ["company_name"] as const;
    const result = "company_name";

    // Act
    const test = pathToId(path);

    // Assert
    expect(test).toBe(result);
  });

  test("Joins a nested field path with dots", () => {
    // Arrange
    const path = ["employees", 0, "employee_name"] as const;
    const result = "employees.0.employee_name";

    // Act
    const test = pathToId(path);

    // Assert
    expect(test).toBe(result);
  });
});
