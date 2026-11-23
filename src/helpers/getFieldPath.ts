// Node modules
import type { RequiredPath } from "@formisch/react";

/**
 * Formisch needs the full path to a field, like `["employees", 0, "employee_name"]`.
 *
 * Components receive the field key as `id` and, only inside nested forms, the parent path as `path`. This method combines both into the full path.
 */
export default function getFieldPath(id: string, path?: RequiredPath): RequiredPath {
  return path ? [...path, id] : [id];
}
