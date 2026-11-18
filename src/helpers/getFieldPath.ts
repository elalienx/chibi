// Node modules
import type { RequiredPath } from "@formisch/react";

/**
 * Formisch identifies fields by a path like `["employees", 0, "employee_name"]`, but most Chibi forms are flat and only pass an `id`.
 *
 * This method appends the `id` to the optional parent `path`, and joins the result with dots to create a unique DOM id like `employees.0.employee_name`.
 */
export default function getFieldPath(id: string, path: RequiredPath | [] = []) {
  const fieldPath = [...path, id];
  const domId = fieldPath.join(".");

  // Our components receive an untyped FormStore, which makes Formisch only accept a single key path.
  return { fieldPath: fieldPath as unknown as [string], domId };
}
