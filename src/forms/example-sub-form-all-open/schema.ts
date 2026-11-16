// Node modules
import * as v from "valibot";

// Schema for each employee sub-form
const employeeSchema = v.object({
  employee_name: v.pipe(
    v.string(),
    v.nonEmpty("Please enter the employee full name."),
    v.minLength(3, "Name is too short."),
    v.maxLength(50, "Name is too long."),
  ),
  job_role: v.pipe(v.string(), v.nonEmpty("Pick a job role.")),
});

// Schema of the main page, including every employee
export const mainSchema = v.object({
  company_name: v.pipe(
    v.string(),
    v.nonEmpty("Please enter the company full name."),
    v.minLength(3, "Name is too short."),
    v.maxLength(50, "Name is too long."),
  ),
  employees: v.array(employeeSchema),
});

// Initial input of each new employee sub-form
export const emptyEmployee = { employee_name: "", job_role: "" };
