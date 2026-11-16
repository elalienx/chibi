// Node modules
import * as v from "valibot";

// Schema of the main page
export const mainSchema = v.object({
  company_name: v.pipe(
    v.string(),
    v.nonEmpty("Please enter the company full name."),
    v.minLength(3, "Name is too short."),
    v.maxLength(50, "Name is too long."),
  ),
});

// Schema for each employee sub-form.
// The suffix makes the keys unique per sub-form, because Chibi also uses them as the DOM id of each field.
export function createSubFormSchema(suffix: number) {
  return v.object({
    [`employee_name_${suffix}`]: v.pipe(
      v.string(),
      v.nonEmpty("Please enter the employee full name."),
      v.minLength(3, "Name is too short."),
      v.maxLength(50, "Name is too long."),
    ),
    [`job_role_${suffix}`]: v.pipe(v.string(), v.nonEmpty("Pick a job role.")),
  });
}
