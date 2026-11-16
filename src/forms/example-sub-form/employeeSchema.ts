// Node modules
import * as v from "valibot";

// Fields
const employee_name = v.pipe(
  v.string(),
  v.nonEmpty("Please enter the employee full name."),
  v.minLength(3, "Name is too short."),
  v.maxLength(50, "Name is too long."),
);

const job_role = v.pipe(v.string(), v.nonEmpty("Pick a job role."));

// Schema
const employeeSchema = v.object({ employee_name, job_role });

export default employeeSchema;
