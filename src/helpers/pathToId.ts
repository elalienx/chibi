// Node modules
import type { RequiredPath } from "@formisch/react";

/**
 * Formisch identifies fields by a path like `["employees", 0, "employee_name"]`, but the DOM needs a string id.
 *
 * This method joins the path with dots, so nested fields get a unique id like `employees.0.employee_name`.
 */
export default function pathToId(path: RequiredPath): string {
  return path.join(".");
}
