// Node modules
import * as v from "valibot";

// Fields
const company_name = v.pipe(
  v.string(),
  v.nonEmpty("Please enter the company full name."),
  v.minLength(3, "Name is too short."),
  v.maxLength(50, "Name is too long."),
);

const employee_name = v.pipe(
  v.string(),
  v.nonEmpty("Please enter the employee full name."),
  v.minLength(3, "Name is too short."),
  v.maxLength(50, "Name is too long."),
);

const job_role = v.pipe(v.string(), v.nonEmpty("Pick a job role."));

// Company schema
export const schemaCompany = v.object({
  company_name,
});

// Employees schema
export const schemaEmployees = v.object({
  employees: v.array(v.object({ employee_name, job_role })),
});
